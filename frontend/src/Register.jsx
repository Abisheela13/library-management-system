import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
     role: "USER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

     await API.post("/api/auth/register", formData);

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  };

  return (

  <div
  className="d-flex justify-content-center align-items-center"
  style={{
    minHeight: "100vh",
    background: "#f4f7fb",
    padding: "20px"
  }}
>
      <div
        className="card shadow-lg card-hover border-0 p-5"
        style={{
          width: "100%",
  maxWidth: "480px",
  borderRadius: "28px",
  background: "#ffffff"
}}
      >

        <h1 className="text-center fw-bold mb-3" style={{
    fontSize: "3rem"
  }}>
          Create Account
        </h1>

        <p className="text-center text-muted mb-4">
          Register to access the library
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="form-control py-3 px-4"
              style={{ borderRadius: "12px" }}
              onChange={handleChange}
            />

          </div>

          <div className="mb-3">

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="form-control p-3"
              style={{ borderRadius: "12px" }}
              onChange={handleChange}
            />

          </div>

          <div className="mb-4">

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="form-control p-3"
              style={{ borderRadius: "12px" }}
              onChange={handleChange}
            />

          </div>

            <select
  name="role"
  className="form-control p-3"
  onChange={handleChange}
>
  <option value="USER">User</option>
  <option value="ADMIN">Admin</option>
</select>


          <button
            className="btn btn-dark w-100 p-3"
            style={{ borderRadius: "12px" }}
          >
            Register
          </button>

        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/">
            Login
          </a>
        </p>

      </div>

    </div>
  );
}

export default Register;