import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("forgot-password/", { email });
      toast.success("Reset link generated!");
      setResetLink(res.data.reset_link); // show reset link for testing
    } catch (err) {
      toast.error("Email not found");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h3>Forgot Password</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary w-100">Send Reset Link</button>
      </form>

      {resetLink && (
        <div className="alert alert-info mt-3">
          <strong>Reset Link (Testing):</strong><br />
          <a href={resetLink}>{resetLink}</a>
        </div>
      )}
    </div>
  );
}
