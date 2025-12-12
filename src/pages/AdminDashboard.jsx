import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [diaries, setDiaries] = useState([]);

  const fetchStats = async () => {
    const res = await API.get("admin/stats/");
    setStats(res.data);
  };

  const fetchUsers = async () => {
    const res = await API.get("admin/users/");
    setUsers(res.data);
  };

  const fetchDiaries = async () => {
    const res = await API.get("diary/");
    setDiaries(res.data);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await API.delete(`admin/users/${id}/delete/`);
    toast.success("User deleted");
    fetchUsers();
  };

  const deleteDiary = async (id) => {
    if (!window.confirm("Delete this diary?")) return;

    await API.delete(`admin/diary/${id}/delete/`);
    toast.success("Diary deleted");
    fetchDiaries();
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchDiaries();
  }, []);

  return (
    <div className="container py-4">

      <h2 className="fw-bold mb-4">⚙️ Admin Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 text-center rounded-4 bg-body">
            <h6 className="text-muted">Total Users</h6>
            <h2 className="fw-bold">{stats.total_users}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 text-center rounded-4 bg-body">
            <h6 className="text-muted">Total Diaries</h6>
            <h2 className="fw-bold">{stats.total_diaries}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 text-center rounded-4 bg-body">
            <h6 className="text-muted">Total Comments</h6>
            <h2 className="fw-bold">{stats.total_comments}</h2>
          </div>
        </div>
      </div>

      <h3 className="fw-bold mt-5">👥 Users</h3>
      <div className="card shadow-sm border-0 rounded-4 p-3 bg-body">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm w-100"
                      onClick={() => deleteUser(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <h3 className="fw-bold mt-5">📘 Diaries</h3>

      <div className="card shadow-sm border-0 rounded-4 p-3 bg-body">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {diaries.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.title}</td>
                  <td>{d.author.username}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm w-100"
                      onClick={() => deleteDiary(d.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {diaries.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">
                    No diaries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
