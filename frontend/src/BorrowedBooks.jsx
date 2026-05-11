import {  useState } from "react";
import API from "./api";
import Navbar from "./Navbar";

function BorrowedBooks() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const loadRecords = async () => {
  try {
    setLoading(true);

    const res = await API.get("/api/borrow/my", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setRecords(res.data || []);
  } catch (error) {
    console.log("Fetch Error:", error);
    alert("API failed - check backend route");
  } finally {
    setLoading(false);
  }
};

  const returnBook = async (borrowId) => {
    try {
      await API.post(
        "/api/borrow/return",
        { borrowId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Book Returned");
      loadRecords(); // refresh safely

    } catch (error) {
      console.log(error);
      alert("Return failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>Borrowed Books</h2>

        {loading && <p>Loading...</p>}

        <div className="row mt-3">
          {records.length > 0 ? (
            records.map((r) => (
              <div className="col-md-4 mb-3" key={r.id}>
                <div className="card p-3 shadow-sm">

                  <h5>{r.book?.title}</h5>
                  <p>{r.book?.author}</p>

                  <p>
                    Status:{" "}
                    <b style={{ color: r.returnedAt ? "green" : "orange" }}>
                      {r.returnedAt ? "Returned" : "Borrowed"}
                    </b>
                  </p>

                  {!r.returnedAt && (
                    <button
                      className="btn btn-dark"
                      onClick={() => returnBook(r.id)}
                    >
                      Return Book
                    </button>
                  )}

                </div>
              </div>
            ))
          ) : (
            !loading && <p>No borrowed books</p>
          )}
        </div>
      </div>
    </>
  );
}

export default BorrowedBooks;