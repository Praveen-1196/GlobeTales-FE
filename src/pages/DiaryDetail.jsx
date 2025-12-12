import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function DiaryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [diary, setDiary] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);


  const loggedInUser = localStorage.getItem("username");

  // Fetch diary
  const fetchDiary = async () => {
    try {
      const res = await API.get(`diary/${id}/`);
      setDiary(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Comments
  const fetchComments = async () => {
    try {
      const res = await API.get(`diary/${id}/comments/`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Likes
  const fetchLikes = async () => {
    try {
      const res = await API.get(`diary/${id}/likes/count/`);
      setLikes(res.data.likes);
    } catch (err) {
      console.log(err);
    }
  };

  // bookmark
  const fetchBookmarkStatus = async () => {
    try {
      const res = await API.get(`diary/${id}/bookmarked/`);
      setBookmarked(res.data.bookmarked);
    } catch (err) {}
  };
  
  useEffect(() => {
    fetchDiary();
    fetchComments();
    fetchLikes();
    fetchBookmarkStatus();
  }, []);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await API.post(`diary/${id}/comments/create/`, { content: newComment });
      setNewComment("");
      fetchComments();
    } catch {
      alert("You must be logged in to comment.");
    }
  };

  const handleLike = async () => {
    try {
      await API.post(`diary/${id}/like-toggle/`);
      fetchLikes();
    } catch {
      alert("You must be logged in to like.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`diary/${id}/delete/`);
      alert("Diary deleted.");
      navigate("/my-diaries");
    } catch {
      alert("Delete failed.");
    }
  };

  if (!diary) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-3">

      {/* HERO IMAGE */}
      <div className="diary-hero mb-4">
        <img
          src={`${diary.photos}`}
          className="hero-img"
        />

        <div className="hero-overlay">
          <h1>{diary.title}</h1>
          <p className="location-tag">📍 {diary.location}</p>
        </div>
      </div>

      {/* META INFO */}
      <div className="d-flex justify-content-between align-items-center">
      <p className="text-muted">
  👤 <strong>Posted by:</strong> 
  <Link to={`/user/${diary.author.username}`} className="ms-1">
    {diary.author.username}
  </Link>&nbsp;•&nbsp; 📅 {diary.date}
</p>


        {loggedInUser === diary.author?.username && (
          <div>
            <Link to={`/edit-diary/${id}`} className="btn btn-warning me-2">
              ✏️ Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              🗑 Delete
            </button>
          </div>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="diary-body mt-3 p-3 rounded shadow-sm">
        <p>{diary.description}</p>
      </div>

      {/* LIKE BUTTON */}
      <button className="btn btn-outline-danger mt-3" onClick={handleLike}>
        ❤️ {likes} Likes
      </button>
      <button
  className="btn btn-outline-secondary ms-2"
  onClick={async () => {
    await API.post(`diary/${id}/bookmark-toggle/`);
    fetchBookmarkStatus();
  }}
>
  {bookmarked ? "⭐ Saved" : "☆ Save"}
</button>


      {/* COMMENTS SECTION */}
      <h3 className="mt-4">Comments</h3>

      <div className="mt-2">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows="2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>

        <button className="btn btn-primary mt-2" onClick={handleAddComment}>
          Post Comment
        </button>
      </div>

      {/* Comments */}
      <div className="mt-3">
        {comments.length === 0 && <p>No comments yet.</p>}

        {comments.map((c) => (
          <div key={c.id} className="comment-box p-2 rounded shadow-sm mb-2">
            <strong>{c.user.username}</strong>
            <p className="mb-1">{c.content}</p>
            <small className="text-muted">{c.created_at}</small>
          </div>
        ))}
      </div>

    </div>
  );
}
