// import { Navigate } from "react-router-dom";

// // export default function ProtectedRoute({ children }) {
// //   const isLoggedIn = Boolean(localStorage.getItem("access"));

// //   return isLoggedIn ? children : <Navigate to="/login" />;
// // }
// export default function ProtectedRoute({ children, adminOnly }) {
//   const token = localStorage.getItem("access");
//   const isStaff = localStorage.getItem("is_staff") === "true";

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (adminOnly && !isStaff) {
//     return <Navigate to="/" />;
//   }

//   return children;
// }


import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const access = localStorage.getItem("access");

  return access ? children : <Navigate to="/login" />;
}
