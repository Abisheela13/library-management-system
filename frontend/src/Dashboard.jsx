import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "./api";
import Navbar from "./Navbar";

function Dashboard() {

  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* LOAD BOOKS */
  useEffect(() => {

  const loadBooks = async () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    // NOT LOGGED IN
    if (!user) {
      navigate("/login");
      return;
    }

    // ADMIN REDIRECT
    if (user.role === "ADMIN") {
      navigate("/admin");
      return;
    }

    try {

      const res = await API.get(
        "/api/books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(res.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load books");

    } finally {

      setLoading(false);

    }
  };

  loadBooks();

}, []);



  /* FETCH BOOKS */
  const fetchBooks = async () => {

    try {

      const res = await API.get(
        "/api/books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(res.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load books");

    } finally {

      setLoading(false);

    }
  };

  /* BORROW BOOK */
  const borrowBook = async (bookId) => {

    try {

      await API.post(
        "/api/borrow/borrow",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book Borrowed Successfully");

      // REFRESH
      fetchBooks();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Borrow Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2>Library Books</h2>

        </div>

        {/* LOADING */}
        {loading && (
          <h5>Loading...</h5>
        )}

        {/* BOOK LIST */}
        <div className="row">

          {books.length > 0 ? (

            books.map((book) => (

              <div
                className="col-12 col-md-6 col-lg-4 mb-4"
                key={book.id}
              >

                <div className="card shadow-sm h-100 border-0">

                  <div className="card-body d-flex flex-column">

                    <h4 className="fw-bold">
                      {book.title}
                    </h4>

                    <p className="text-muted mb-2">
                      {book.author}
                    </p>

                    <p className="mb-2">
                      <strong>Total Quantity:</strong>{" "}
                      {book.quantity}
                    </p>

                    <p className="mb-3">
                      <strong>Available:</strong>{" "}

                      <span
                        className={
                          book.available > 0
                            ? "text-success fw-bold"
                            : "text-danger fw-bold"
                        }
                      >
                        {book.available}
                      </span>
                    </p>

                    <div className="mt-auto">

                      <button
                        className="btn btn-dark w-100"
                        disabled={book.available <= 0}
                        onClick={() =>
                          borrowBook(book.id)
                        }
                      >

                        {
                          book.available > 0
                            ? "Borrow Book"
                            : "Out Of Stock"
                        }

                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))

          ) : (

            !loading && (
              <p>No books available</p>
            )

          )}

        </div>

      </div>
    </>
  );
}

export default Dashboard;