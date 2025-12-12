import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("register/", form);
      toast.success("Registration successful!");
      navigate("/login");
    } catch {
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="card p-4 shadow" style={{ width: "380px" }}>
        <h3 className="text-center mb-3">Create Account</h3>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              className="form-control"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
