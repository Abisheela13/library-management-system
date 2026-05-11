import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Success");

      const role = res.data.user.role;

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">

      <form
        onSubmit={handleLogin}
        className="p-5 shadow bg-white rounded"
        style={{ width: "350px" }}
      >

        <h3 className="mb-3 text-center">Login</h3>

        {/* EMAIL */}
        <input
          className="form-control mb-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          className="btn btn-dark w-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-2">
          <a href="/register">Register</a>
        </p>

      </form>

    </div>
  );
}

export default Login;