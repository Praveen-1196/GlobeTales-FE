import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

export default function AuthorProfile() {
  const { username } = useParams();
  const [author, setAuthor] = useState(null);

  const fetchAuthor = async () => {
    try {
      const res = await API.get(`users/${username}/`);
      setAuthor(res.data);
    } catch (err) {
      console.log(err);
      setAuthor(null);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, [username]);

  if (!author) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">

      <h2 className="fw-bold">👤 {author.username}</h2>
      <p className="text-muted">
        Joined: {new Date(author.date_joined).toLocaleDateString()} <br/>
        Diaries: {author.diary_count}
      </p>

      <h4 className="mt-4">📘 Diaries by {author.username}</h4>

      <div className="row mt-3">
        {author.diaries.map((d) => (
          <div className="col-md-4 mb-3" key={d.id}>
            <div className="card shadow-sm">
              {d.photos ? (
                <img
                  src={`${d.photos}`}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              ) : (
                <div className="bg-dark text-white p-5 text-center">
                  No Image
                </div>
              )}

              <div className="card-body">
                <h5>{d.title}</h5>
                <p className="text-muted">{d.location}</p>

                <Link className="btn btn-primary btn-sm" to={`/diary/${d.id}`}>
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
