import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // USER REGISTER ONLY
      await API.post("/api/auth/register", {
        ...form,
        role: "USER",
      });

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="container mt-5">

      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "450px" }}
      >

        <h2 className="text-center mb-4">
          User Register
        </h2>

        <form onSubmit={handleRegister}>

          {/* NAME */}
          <input
            type="text"
            placeholder="Enter Name"
            className="form-control mb-3"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            required
          />

          {/* BUTTON */}
          <button
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center mt-3">

          Already have account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;