import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "./api";

function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin =
    new URLSearchParams(location.search).get("role") === "admin";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

 const handleLogin = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const endpoint = "/api/auth/login";

    const res = await API.post(endpoint, form);

    localStorage.setItem(
      "token",
      res.data.token
    );

    // ADMIN CHECK
    if (
      form.email === "admin@gmail.com" &&
      form.password === "admin123"
    ) {

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Admin",
          role: "ADMIN",
        })
      );

      navigate("/admin");

    } else {

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");

    }

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Login Failed"
    );

  } finally {

    setLoading(false);

  }

};

  return (
    <div className="container mt-5">

      <h2>
        {isAdmin ? "Admin Login" : "User Login"}
      </h2>

      <form onSubmit={handleLogin}>

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button className="btn btn-dark w-100">

          {loading
            ? "Loading..."
            : isAdmin
            ? "Login as Admin"
            : "Login"}

        </button>

      </form>
    </div>
  );
}

export default Login;