import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-hot-toast";

export default function EditDiary() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });

  const [photo, setPhoto] = useState(null);

  const fetchDiary = async () => {
    try {
      const res = await API.get(`diary/${id}/`);
      setForm({
        title: res.data.title,
        description: res.data.description,
        location: res.data.location,
        date: res.data.date,
      });
    } catch (err) {
      toast.error("Diary not found");
    }
  };

  useEffect(() => {
    fetchDiary();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("title", form.title);
    updatedData.append("description", form.description);
    updatedData.append("location", form.location);
    updatedData.append("date", form.date);

    if (photo) updatedData.append("photos", photo);

    try {
      await API.put(`diary/${id}/update/`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Diary updated successfully!");
      navigate(`/diary/${id}`);
    } catch (err) {
      toast.error("Update failed.");
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center px-3">
      <div className="card shadow p-4 border-0 rounded-4 bg-body" style={{ maxWidth: "650px", width: "100%" }}>

        <button
          className="btn btn-outline-secondary btn-sm mb-3"
          onClick={() => window.history.back()}
        >
          ← Back
        </button>

        <h2 className="fw-bold text-center mb-2">Edit Diary</h2>
        <p className="text-center text-muted mb-4">
          Update your travel story ✏️
        </p>

        <form onSubmit={handleUpdate}>
          
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              name="title"
              className="form-control bg-body-tertiary text-body"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              rows="4"
              className="form-control bg-body-tertiary text-body"
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Location</label>
            <input
              name="location"
              className="form-control bg-body-tertiary text-body"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Date</label>
            <input
              type="date"
              name="date"
              className="form-control bg-body-tertiary text-body"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Upload New Photo</label>
            <input
              type="file"
              className="form-control bg-body-tertiary text-body"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>

          <button className="btn btn-warning w-100 py-2">
            ✏️ Update Diary
          </button>
        </form>
      </div>
    </div>
  );
}
