import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [diaries, setDiaries] = useState([]);
  const [search, setSearch] = useState("");

  const fetchDiaries = async () => {
    try {
      const res = await API.get("diary/");
      setDiaries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  const handleSearch = async () => {
    const res = await API.get(`diary/search/?q=${search}`);
    setDiaries(res.data);
  };

  return (
    <div className="container mt-4">

      {/* Heading */}
      <h1 className="page-title mb-4">🌍 Travel Diaries</h1>

      {/* Search Bar */}
      <div className="search-bar d-flex mb-4">
        <input
          className="form-control me-2 search-input"
          placeholder="Search trips, places, people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Diaries Grid */}
      <div className="row">
        {diaries.map((d) => (
          <div className="col-md-4 mb-4" key={d.id}>
            <div className="diary-card shadow">

              {/* Image */}
              {d.photos ? (
                <div className="diary-img-wrapper">
                  <img
                    src={`${d.photos}`}
                    className="diary-img"
                  />

                  <span className="location-badge">
                    📍 {d.location}
                  </span>
                </div>
              ) : (
                <div className="no-img">No Image</div>
              )}

              {/* Card Body */}
              <div className="p-3">
                <h5 className="diary-title">{d.title}</h5>

                {/* Author */}
                {d.author && (
                  <p className="text-muted small m-0">
                    ✍️ By {d.author.username}
                  </p>
                )}

                {/* Buttons */}
                <Link className="btn btn-outline-primary w-100 mt-3" to={`/diary/${d.id}`}>
                  View Diary
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
