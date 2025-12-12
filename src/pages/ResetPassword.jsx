import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitNewPassword = async (e) => {
    e.preventDefault();

    try {
      await API.post(`reset-password/${uid}/${token}/`, { password });
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Invalid or expired link");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h3>Reset Password</h3>

      <form onSubmit={submitNewPassword}>
        <input
          className="form-control mb-3"
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100">Reset Password</button>
      </form>
    </div>
  );
}
