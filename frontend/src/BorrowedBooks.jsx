import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./Navbar";

function BorrowedBooks() {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* LOAD BORROWED BOOKS */
  useEffect(() => {

    API.get(
      "/api/borrow/my",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

      .then((res) => {

        setRecords(res.data || []);

      })

      .catch((error) => {

        console.log("Fetch Error:", error);

        alert("Failed to load borrowed books");

      })

      .finally(() => {

        setLoading(false);

      });

  }, []);

  /* RETURN BOOK */
  const returnBook = async (borrowId) => {

    try {

      await API.post(
        "/api/borrow/return",
        { borrowId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book Returned Successfully");

      // REFRESH RECORDS
      const res = await API.get(
        "/api/borrow/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecords(res.data || []);

    } catch (error) {

      console.log(error);

      alert("Return Failed");

    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          Borrowed Books
        </h2>

        {/* LOADING */}
        {loading && (
          <h5>Loading...</h5>
        )}

        {/* BOOK LIST */}
        <div className="row">

          {
            records.length > 0 ? (

              records.map((r) => (

                <div
                  className="col-md-4 mb-4"
                  key={r.id}
                >

                  <div className="card shadow-sm p-4 h-100 border-0">

                    <h4 className="fw-bold">
                      {r.book?.title}
                    </h4>

                    <p className="text-muted">
                      {r.book?.author}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}

                      <span
                        className={
                          r.returnedAt
                            ? "text-success fw-bold"
                            : "text-warning fw-bold"
                        }
                      >
                        {
                          r.returnedAt
                            ? "Returned"
                            : "Borrowed"
                        }
                      </span>

                    </p>

                    <p>
                      <strong>Borrowed Date:</strong>{" "}

                      {
                        new Date(
                          r.borrowedAt
                        ).toLocaleDateString()
                      }
                    </p>

                    {
                      r.returnedAt && (

                        <p>
                          <strong>Returned Date:</strong>{" "}

                          {
                            new Date(
                              r.returnedAt
                            ).toLocaleDateString()
                          }
                        </p>

                      )
                    }

                    {
                      !r.returnedAt && (

                        <button
                          className="btn btn-dark mt-2"
                          onClick={() =>
                            returnBook(r.id)
                          }
                        >
                          Return Book
                        </button>

                      )
                    }

                  </div>

                </div>

              ))

            ) : (

              !loading && (
                <p>No borrowed books</p>
              )

            )
          }

        </div>

      </div>
    </>
  );
}

export default BorrowedBooks;