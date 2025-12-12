import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/GTlogo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = Boolean(localStorage.getItem("access"));
  const username = localStorage.getItem("username");
  const isStaff = localStorage.getItem("is_staff") === "true";

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to <html> tag
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Active link highlight
  const isActive = (path) =>
    location.pathname === path ? "active fw-semibold" : "";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm 
        ${theme === "light" ? "bg-light navbar-light" : "bg-dark navbar-dark"}`}
    >
      <div className="container">

        {/* Logo Section */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={Logo} alt="Logo" height="32" className="me-2 rounded" />
          <span className="fw-bold">GlobeTales</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="mainNavbar">

          {/* Left Menu */}
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")}`} to="/">
                🏠 Home
              </Link>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <Link className={`nav-link ${isActive("/create-diary")}`} to="/create-diary">
                  ✨ Create
                </Link>
              </li>
            )}

            {isStaff && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/admin-dashboard")}`}
                  to="/admin-dashboard"
                >
                  ⚙️ Admin
                </Link>
              </li>
            )}
            
          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center gap-2">

            {/* Theme Toggle */}
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Auth Buttons */}
            {!isLoggedIn ? (
              <>
                <Link
                  className={`btn btn-sm ${
                    theme === "light" ? "btn-outline-primary" : "btn-outline-light"
                  }`}
                  to="/login"
                >
                  Login
                </Link>

                <Link className="btn btn-primary btn-sm px-3" to="/register">
                  Register
                </Link>
              </>
            ) : (
              // Profile Dropdown
              <div className="dropdown">
                <button
                  className={`nav-link dropdown-toggle border-0 bg-transparent ${
                    theme === "light" ? "text-dark" : "text-light"
                  }`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  👤 {username}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">My Profile</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/my-diaries">My Diaries</Link>
                  </li>
                  {isLoggedIn && (
  <Link className={`nav-link ${isActive("/bookmarks")}`} to="/bookmarks">
    ⭐ Saved
  </Link>
)}

                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                  
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
