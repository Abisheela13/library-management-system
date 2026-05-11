import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "250px",
        background: "#111",
        color: "#fff",
        padding: "20px"
      }}>

        <h3 style={{ marginBottom: "20px" }}>Admin Panel</h3>

        <Link to="/admin" style={{ display: "block", color: "#fff", marginBottom: "10px" }}>
           Books
        </Link>

        <Link to="/admin/borrow" style={{ display: "block", color: "#fff", marginBottom: "10px" }}>
          Borrow Requests
        </Link>

        <Link to="/admin/history" style={{ display: "block", color: "#fff", marginBottom: "10px" }}>
          History
        </Link>

        <Link to="/admin/analytics" style={{ display: "block", color: "#fff", marginBottom: "10px" }}>
           Analytics
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          style={{
            marginTop: "20px",
            background: "red",
            color: "#fff",
            padding: "8px",
            border: "none",
            width: "100%"
          }}
        >
          Logout
        </button>

      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;