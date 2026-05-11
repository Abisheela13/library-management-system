import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar bg-dark text-white px-3">

      <h4>Library System</h4>

      <div className="d-flex gap-3">

        <Link className="text-white" to="/dashboard">Home</Link>
        <Link className="text-white" to="/history">History</Link>
        <Link className="text-white" to="/profile">Profile</Link>
        <Link className="text-white" to="/admin-analytics">Analytics</Link>

      </div>

    </nav>
  );
}

export default Navbar;