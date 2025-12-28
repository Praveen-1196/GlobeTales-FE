import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreateDiary from "./pages/CreateDiary";
import EditDiary from "./pages/EditDiary";
import DiaryDetail from "./pages/DiaryDetail";
import MyDiaries from "./pages/MyDiaries";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ChangePassword from "./pages/ChangePassword";
import AuthorProfile from "./pages/AuthorProfile";
import Bookmarks from "./pages/Bookmarks";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-diary"
          element={
            <ProtectedRoute>
              <CreateDiary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-diary/:id"
          element={
            <ProtectedRoute>
              <EditDiary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-diaries"
          element={
            <ProtectedRoute>
              <MyDiaries />
            </ProtectedRoute>
          }
        />

        <Route path="/diary/:id" element={<DiaryDetail />} />

        {/* Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>}/>
        <Route path="/user/:username" element={<AuthorProfile />} /> 
        <Route
  path="/bookmarks"
  element={
    <ProtectedRoute>
      <Bookmarks />
    </ProtectedRoute>
  }
/>
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

             </Routes>
    </>
  );
}
