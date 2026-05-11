import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./Navbar";

function AdminHistory() {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        setLoading(true);

        const response = await API.get(
          "/api/borrow",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRecords(response.data || []);

      } catch (error) {

        console.log(error);

        alert("Failed to load history");

      } finally {

        setLoading(false);

      }

    };

    fetchHistory();

  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h1 className="mb-4">
          Borrow History
        </h1>

        {/* LOADING */}
        {loading && (
          <h5>Loading...</h5>
        )}

        <div className="row">

          {records.length > 0 ? (

            records.map((r) => (

              <div
                className="col-md-4 mb-4"
                key={r.id}
              >

                <div className="card p-4 shadow-sm h-100">

                  <h4>
                    {r.book?.title}
                  </h4>

                  <p>
                    User:
                    <b> {r.user?.name}</b>
                  </p>

                  <p>
                    Status:
                    <b> {r.status}</b>
                  </p>

                  <p>
                    Borrowed:
                    <b>
                      {" "}
                      {new Date(
                        r.borrowedAt
                      ).toLocaleDateString()}
                    </b>
                  </p>

                  <p>
                    Returned:
                    <b>
                      {" "}
                      {r.returnedAt
                        ? new Date(
                            r.returnedAt
                          ).toLocaleDateString()
                        : "Not Returned"}
                    </b>
                  </p>

                </div>

              </div>

            ))

          ) : (

            !loading && (
              <p>No history found</p>
            )

          )}

        </div>

      </div>
    </>
  );
}

export default AdminHistory;