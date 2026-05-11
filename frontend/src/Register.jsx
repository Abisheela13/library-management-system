import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/auth/register", form);

      alert("Register Success");
      navigate("/");

    } catch (error) {
      console.log("REGISTER ERROR:", error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <h3>Register</h3>

      <form onSubmit={handleRegister}>

        <input
          placeholder="Name"
          className="form-control mb-2"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="form-control mb-2"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          className="form-control mb-3"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button className="btn btn-dark w-100">
          Register
        </button>

      </form>
    </div>
  );
}

export default Register;