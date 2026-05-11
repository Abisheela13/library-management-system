import { useEffect, useState } from "react";
import API from "./api";
import Navbar from "./Navbar";

function BorrowHistory() {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
  if (!token) return;

  const load = async () => {
    try {
      const res = await API.get("/api/borrow/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHistory(res.data || []);
    } catch (err) {
      console.log("History Error:", err);
    }
  };

  load();
}, [token]);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h3>Borrow History</h3>

        <div className="row mt-3">
          {history.length > 0 ? (
            history.map((h) => (
              <div className="col-md-4 mb-3" key={h.id}>
                <div
                  className="card p-3 shadow-sm"
                  style={{
                    borderLeft:
                      h.overdueDays > 0 ? "6px solid red" : "6px solid green",
                  }}
                >
                  <h5>{h.book || "Unknown Book"}</h5>

                  <p>Days Used: {h.daysUsed}</p>

                  <p style={{ color: h.overdueDays > 0 ? "red" : "green" }}>
                    Overdue: {h.overdueDays} days
                  </p>

                  <h6>
                    Fine: ₹
                    <span style={{ color: h.fine > 0 ? "red" : "green" }}>
                      {h.fine}
                    </span>
                  </h6>

                  <p>Status: {h.status}</p>
                </div>
              </div>
            ))
          ) : (
           <p className="text-muted mt-3">No borrow history found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default BorrowHistory;