import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function Bookmarks() {
  const [diaries, setDiaries] = useState([]);

  const fetchBookmarks = async () => {
    const res = await API.get("bookmarks/");
    setDiaries(res.data);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="container mt-4">
      <h2>⭐ Saved Diaries</h2>

      <div className="row mt-3">
        {diaries.map((d) => (
          <div className="col-md-4 mb-3" key={d.id}>
            <div className="card shadow-sm">

              {d.photos ? (
                <img
                  src={`http://127.0.0.1:8000${d.photos}`}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              ) : (
                <div className="bg-dark text-white p-4 text-center">
                  No Image
                </div>
              )}

              <div className="card-body">
                <h5>{d.title}</h5>
                <p className="text-muted">{d.location}</p>

                <Link to={`/diary/${d.id}`} className="btn btn-primary btn-sm">
                  View
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
