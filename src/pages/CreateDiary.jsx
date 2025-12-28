import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateDiary() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !location || !date) {
      toast.error("All fields except photo are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("date", date);

    if (photo) {
      formData.append("photos", photo);
    }

    try {
      await API.post("diary/create/", formData);

      toast.success("Diary created successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("You must be logged in to create a diary.");
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center px-3">
      <div className="card shadow p-4 border-0 rounded-4 bg-body" style={{ maxWidth: "600px", width: "100%" }}>
  
        {/* Back Button */}
        <button
          className="btn btn-outline-secondary btn-sm mb-3"
          onClick={() => window.history.back()}
        >
          ← Back
        </button>
  
        {/* Heading */}
        <h2 className="fw-bold text-center mb-2">Create New Diary</h2>
        <p className="text-center text-muted mb-4">
          Capture your travel memories and share your story ✨
        </p>
  
        {/* Form */}
        <form onSubmit={handleSubmit}>
  
          <label className="form-label fw-semibold">Title</label>
          <input
            className="form-control bg-body-tertiary text-body mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
  
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control bg-body-tertiary text-body mb-3"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
  
          <label className="form-label fw-semibold">Location</label>
          <input
            className="form-control bg-body-tertiary text-body mb-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
  
          <label className="form-label fw-semibold">Date</label>
          <input
            type="date"
            className="form-control bg-body-tertiary text-body mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
  
          <label className="form-label fw-semibold">Photo</label>
          <input
            type="file"
            className="form-control bg-body-tertiary text-body mb-4"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
  
          {/* Submit Button */}
          <button className="btn btn-primary w-100 py-2">
            📘 Create Diary
          </button>
        </form>
  
      </div>
    </div>
  );
  
}
