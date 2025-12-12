import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await API.post("change-password/", form);
      toast.success("Password changed successfully!");

      // Optional: logout user after password change
      localStorage.clear();
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.error || "Password change failed");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center px-3">
      <div
        className="card p-4 shadow border-0 rounded-4 bg-body"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h2 className="fw-bold text-center mb-3">🔐 Change Password</h2>

        <form onSubmit={handleSubmit}>

          <label className="form-label fw-semibold">Current Password</label>
          <input
            type="password"
            name="old_password"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <label className="form-label fw-semibold">New Password</label>
          <input
            type="password"
            name="new_password"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <label className="form-label fw-semibold">Confirm New Password</label>
          <input
            type="password"
            name="confirm_password"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">
            Update Password
          </button>

        </form>
      </div>
    </div>
  );
}
