import {  useState } from "react";
import API from "./api";
import Navbar from "./Navbar";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // LOAD BOOKS
  const loadBooks = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required");
      return;
    }

    const res = await API.get("/api/books", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setBooks(res.data);

  } catch (error) {
    console.log("LOAD ERROR:", error.response || error.message);

    alert(
      error.response?.data?.message ||
      "Server error while loading books"
    );
  } finally {
    setLoading(false);
  }
};
  // BORROW BOOK
  const borrow = async (bookId) => {
    try {
      await API.post(
        "/api/borrow/borrow",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Borrowed Successfully");
      loadBooks();

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Borrow failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h3 className="mb-3">Books</h3>

        {/* LOADING STATE */}
        {loading && <p>Loading books...</p>}

        {/* EMPTY STATE */}
        {!loading && books.length === 0 && (
          <p>No books available</p>
        )}

        <div className="row">
          {books.map((b) => (
            <div className="col-md-4 mb-3" key={b.id}>
              <div className="card p-3 shadow-sm h-100">

                <h5>{b.title}</h5>
                <p>{b.author}</p>

                {/* STATUS FROM BACKEND */}
                <p>
                  Status:{" "}
                  {b.available ? (
                    <span style={{ color: "green" }}>Available</span>
                  ) : (
                    <span style={{ color: "red" }}>Not Available</span>
                  )}
                </p>

                <button
                  className="btn btn-dark"
                  disabled={!b.available}
                  onClick={() => borrow(b.id)}
                >
                  {b.available ? "Borrow" : "Unavailable"}
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default Dashboard;