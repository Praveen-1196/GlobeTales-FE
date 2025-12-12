import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await API.get("profile/");
      setProfile(res.data);
      setForm({
        username: res.data.username,
        email: res.data.email,
      });
    } catch (err) {
      toast.error("Failed to load profile");
      navigate("/login");
    }
  };

  const updateProfile = async () => {
    if (!form.username.trim() || !form.email.trim()) {
      toast.error("Username and Email cannot be empty");
      return;
    }

    if (
      form.username === profile.username &&
      form.email === profile.email
    ) {
      toast("No changes detected");
      return;
    }

    setLoading(true);
    try {
      await API.put("profile/", form);
      toast.success("Profile updated!");
      getProfile();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!profile) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-5 d-flex justify-content-center px-3">
      <div
        className="card p-4 shadow border-0 rounded-4 bg-body"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="fw-bold text-center mb-3">👤 My Profile</h2>

        {/* Username */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Username</label>
          <input
            className="form-control bg-body-tertiary text-body"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            className="form-control bg-body-tertiary text-body"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Save Button */}
        <button
          className="btn btn-primary w-100"
          onClick={updateProfile}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {/* Change Password */}
        <button
          className="btn btn-outline-secondary w-100 mt-3"
          onClick={() => navigate("/change-password")}
        >
          🔐 Change Password
        </button>
      </div>
    </div>
  );
}
