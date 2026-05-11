import { Link } from "react-router-dom";

function Home() {

  return (
    <div className="container text-center mt-5">

      <h1 className="mb-5">
        Library Management System
      </h1>

      <div className="d-flex gap-3 justify-content-center">

        <Link
          to="/login"
          className="btn btn-primary"
        >
          Login as User
        </Link>

        <Link
          to="/login?role=admin"
          className="btn btn-dark"
        >
          Login as Admin
        </Link>

        <Link
          to="/register"
          className="btn btn-success"
        >
          Register
        </Link>

      </div>

    </div>
  );
}

export default Home;