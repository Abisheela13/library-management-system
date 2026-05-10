import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

      const response = await API.post(
  "/api/auth/login",
  formData
);

      // save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      // role based redirect
      if (response.data.user.role === "ADMIN") {

        navigate("/admin");

      } else {

        navigate("/dashboard");

      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
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

        <h1 className="text-center fw-bold mb-3"   style={{fontSize: "3rem"}}>
          Welcome Back
        </h1>

        <p className="text-center text-muted mb-4">
          Login to continue
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="form-control py-3 px-4"
              style={{
                borderRadius: "12px"
              }}
              onChange={handleChange}
            />

          </div>

          <div className="mb-4">

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="form-control p-3"
              style={{
                borderRadius: "12px"
              }}
              onChange={handleChange}
            />

          </div>

          <button
            className="btn btn-dark w-100 p-3"
            style={{
              borderRadius: "12px"
            }}
          >
            Login
          </button>

        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/register">
            Register
          </a>
        </p>

      </div>

    </div>
  );
}

export default Login;