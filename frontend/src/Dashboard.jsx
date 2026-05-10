import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./Navbar";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = localStorage.getItem("token");

  const [books, setBooks] = useState([]);


  // fetch
  const fetchBooks = async () => {

    try {

      const response = await API.get(
        "/api/books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to fetch books");

    }
  };


  // load book
  useEffect(() => {

    const loadBooks = async () => {
      await fetchBooks();
    };

    loadBooks();

  }, []);


  // borrow book
  const borrowBook = async (bookId) => {

    try {

      await API.post(
        "/borrow/borrow",
        {
          bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book Borrowed");

      fetchBooks();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to borrow book"
      );

    }
  };


  // logout
  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/";

  };


  return (

    <>

      <Navbar />

      <div
        className="container-fluid px-4 px-md-5 py-5"
        style={{
          minHeight: "100vh",
          background: "#f5f7fb"
        }}
      >

        

        <div
          className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-5 gap-3"
        >

          <div>

            <h1
              className="fw-bold mb-2"
              style={{
                fontSize: "3rem",
                color: "#111827"
              }}
            >
              Library Dashboard
            </h1>

            <p
              className="mb-0"
              style={{
                color: "#6b7280",
                fontSize: "1.1rem"
              }}
            >
              Welcome, {user?.name}
            </p>

          </div>

          <div className="d-flex flex-wrap gap-3">

            <a
              href="/borrowed"
              className="btn btn-outline-dark px-4 py-3"
              style={{
                borderRadius: "14px",
                fontWeight: "600"
              }}
            >
              Borrowed Books
            </a>

            <button
              className="btn btn-dark px-4 py-3"
              onClick={handleLogout}
              style={{
                borderRadius: "14px",
                fontWeight: "600"
              }}
            >
              Logout
            </button>

          </div>

        </div>


        {/* list */}

        <div className="row">

          {
            books?.map((book) => (

              <div
                className="col-sm-6 col-xl-4 mb-4"
                key={book.id}
              >

                <div
                  className="card border-0 shadow-sm h-100 p-4"
                  style={{
                    borderRadius: "24px",
                    transition: "0.3s ease",
                    background: "#ffffff"
                  }}
                >

                  <h3
                    className="fw-bold mb-2"
                    style={{
                      color: "#111827"
                    }}
                  >
                    {book.title}
                  </h3>

                  <p
                    className="mb-4"
                    style={{
                      color: "#6b7280",
                      fontSize: "1rem"
                    }}
                  >
                    {book.author}
                  </p>

                  <p
                    className="mb-4"
                    style={{
                      fontSize: "1rem"
                    }}
                  >

                    <strong>Status:</strong>{" "}

                    {
                      book.available
                        ? (
                          <span className="text-success fw-semibold">
                            Available
                          </span>
                        )
                        : (
                          <span className="text-danger fw-semibold">
                            Borrowed
                          </span>
                        )
                    }

                  </p>

                  <button
                    className={
                      book.available
                        ? "btn btn-dark mt-auto py-3"
                        : "btn btn-secondary mt-auto py-3"
                    }
                    disabled={!book.available}
                    onClick={() => borrowBook(book.id)}
                    style={{
                      borderRadius: "14px",
                      fontWeight: "600"
                    }}
                  >
                    {
                      book.available
                        ? "Borrow Book"
                        : "Unavailable"
                    }
                  </button>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </>

  );
}

export default Dashboard;