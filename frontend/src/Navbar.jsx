import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {

const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <nav
      className="navbar navbar-dark bg-dark px-4 py-3"
    >

      <Link
        className="navbar-brand fw-bold"
        to="/dashboard"
      >
        Library
      </Link>

      <div className="d-flex gap-2">

        {user && user.role !== "ADMIN" && (
          <>
            <Link
              className="btn btn-light"
              to="/dashboard"
            >
              Books
            </Link>

            <Link
              className="btn btn-warning"
              to="/borrowed"
            >
              Borrowed
            </Link>

            <Link
              className="btn btn-info"
              to="/history"
            >
              History
            </Link>

            <Link
              className="btn btn-success"
              to="/profile"
            >
              Profile
            </Link>

            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;