import { useEffect, useState } from "react";
import API from "./api";

function AdminBorrowRequests() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  const loadRequests = async () => {
    try {
      const res = await API.get("/api/admin/borrow-records", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveReturn = async (id) => {
    try {
      await API.post(
        "/api/borrow/approve-return",
        { borrowId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Approved");
      loadRequests();
    } catch (err) {
      console.log(err);
    }
  };

 useEffect(() => {
  const fetchRequests = async () => {
    try {
      const res = await API.get("/api/admin/borrow-records", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequests(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  fetchRequests();
}, []);
  return (
    <div>
      <h2>Borrow Requests</h2>

      {requests.map((r) => (
        <div key={r.id} className="card p-3 mb-2">
          <h5>{r.book.title}</h5>
          <p>User: {r.user.name}</p>
          <p>Status: {r.returnedAt ? "Returned" : "Active"}</p>

          {!r.returnedAt && (
            <button
              className="btn btn-success"
              onClick={() => approveReturn(r.id)}
            >
              Approve Return
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminBorrowRequests;