import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserLayout() {


const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >

      {/* SIDEBAR */}
      <div
        style={{
          width: "250px",
          background: "#111827",
          color: "#fff",
          padding: "25px",
        }}
      >

        <h2 className="mb-4">
          User Panel
        </h2>

        <Link
          to="/dashboard"
          style={linkStyle}
        >
          Books
        </Link>

        <Link
          to="/borrowed"
          style={linkStyle}
        >
          Borrowed Books
        </Link>

        <Link
          to="/history"
          style={linkStyle}
        >
          Borrow History
        </Link>

        <Link
          to="/profile"
          style={linkStyle}
        >
          Profile
        </Link>

        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            background: "#1f2937",
            borderRadius: "12px",
          }}
        >

          <p>
            <strong>User:</strong>
          </p>

          <p>{user?.name}</p>

          <p>
            <strong>Role:</strong>
          </p>

          <p>{user?.role}</p>

        </div>

        <button
          onClick={() => {
            localStorage.clear();
           navigate("/");
          }}
          style={{
            marginTop: "20px",
            background: "red",
            color: "#fff",
            border: "none",
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          Logout
        </button>

      </div>

      {/* PAGE */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          background: "#f5f7fb",
        }}
      >
        <Outlet />
      </div>

    </div>
  );
}

const linkStyle = {
  display: "block",
  color: "#fff",
  marginBottom: "15px",
  textDecoration: "none",
  fontSize: "17px",
};

export default UserLayout;