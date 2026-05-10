import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./Navbar";

function BorrowedBooks() {

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [records, setRecords] = useState([]);


  // fetch
  const fetchRecords = async () => {

    try {

      const response = await API.get(
        "/api/borrow",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userRecords = response.data.filter(
        (record) =>
          record.userId === user.id &&
          !record.returnedAt
      );

      setRecords(userRecords);

    } catch (error) {

      console.log(error);

      alert("Failed to fetch records");

    }
  };


  // load data
  useEffect(() => {

    const loadRecords = async () => {
      await fetchRecords();
    };

    loadRecords();

  }, []);


  // return book
  const returnBook = async (borrowId) => {

    try {

      await API.post(
        "/api/borrow/return",
        {
          borrowId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book Returned");

      fetchRecords();

    } catch (error) {

      console.log(error);

      alert("Failed to return book");

    }
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
              Borrowed Books
            </h1>

            <p
              style={{
                color: "#6b7280",
                fontSize: "1.1rem"
              }}
            >
              Your currently borrowed books
            </p>

          </div>

          <a
            href="/dashboard"
            className="btn btn-dark px-4 py-3"
            style={{
              borderRadius: "14px",
              fontWeight: "600"
            }}
          >
            Back to Dashboard
          </a>

        </div>


        <div className="row">

          {
            records?.length > 0
              ? (
                records.map((record) => (

                  <div
                    className="col-sm-6 col-xl-4 mb-4"
                    key={record.id}
                  >

                    <div
                      className="card border-0 shadow-sm h-100 p-4"
                      style={{
                        borderRadius: "24px",
                        background: "#ffffff"
                      }}
                    >

                      <h3 className="fw-bold mb-2">
                        {record.book.title}
                      </h3>

                      <p
                        className="mb-4"
                        style={{
                          color: "#6b7280"
                        }}
                      >
                        {record.book.author}
                      </p>

                      <button
                        className="btn btn-dark mt-auto py-3"
                        onClick={() => returnBook(record.id)}
                        style={{
                          borderRadius: "14px",
                          fontWeight: "600"
                        }}
                      >
                        Return Book
                      </button>

                    </div>

                  </div>

                ))
              )
              : (
                <div className="text-center py-5">

                  <h3 className="fw-bold">
                    No Borrowed Books
                  </h3>

                  <p className="text-muted">
                    Borrow books from dashboard
                  </p>

                </div>
              )
          }

        </div>

      </div>

    </>

  );
}

export default BorrowedBooks;