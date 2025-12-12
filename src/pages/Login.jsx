import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("login/", { username, password });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("is_staff", res.data.user.is_staff);

      toast.success("Login successful!");
      navigate("/");
    } catch {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="card p-4 shadow" style={{ width: "380px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
