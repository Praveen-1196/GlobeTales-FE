import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function MyDiaries() {
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();

  const fetchMyDiaries = async () => {
    try {
      const res = await API.get("my-diaries/");
      setDiaries(res.data);
    } catch (err) {
      console.error(err);
      alert("You must be logged in to view your diaries.");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchMyDiaries();
  }, []);

  return (
    <div className="container mt-4">

      <h2 className="page-title mb-4">📘 My Travel Diaries</h2>

      {diaries.length === 0 && (
        <p className="text-muted">You haven't created any diaries yet.</p>
      )}

      <div className="row">
        {diaries.map((d) => (
          <div className="col-md-4 mb-4" key={d.id}>
            <div className="diary-card shadow">

              {/* Image */}
              <div className="diary-img-wrapper">
                {d.photos ? (
                  <img
                    src={`http://127.0.0.1:8000${d.photos}`}
                    className="diary-img"
                  />
                ) : (
                  <div className="no-img">No Image</div>
                )}

                <span className="location-badge">
                  📍 {d.location}
                </span>

                <span className="date-badge">
                  {d.date}
                </span>
              </div>

              <div className="p-3">
                <h5 className="diary-title">{d.title}</h5>

                {/* Buttons Row */}
                <div className="d-flex mt-3 gap-2">

                  <Link className="btn btn-outline-primary w-100" to={`/diary/${d.id}`}>
                    View
                  </Link>

                  <Link className="btn btn-warning w-100" to={`/edit-diary/${d.id}`}>
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger w-100"
                    onClick={async () => {
                      if (window.confirm("Delete this diary?")) {
                        await API.delete(`diary/${d.id}/delete/`);
                        fetchMyDiaries();
                      }
                    }}
                  >
                    Delete
                  </button>

                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
