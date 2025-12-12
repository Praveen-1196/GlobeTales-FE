// import { Navigate } from "react-router-dom";

// export default function AdminRoute({ children }) {
//   const isLoggedIn = Boolean(localStorage.getItem("access"));
//   const isAdmin = localStorage.getItem("is_staff") === "true";

//   if (!isLoggedIn || !isAdmin) {
//     return <Navigate to="/" />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isStaff = localStorage.getItem("is_staff") === "true";

  return isStaff ? children : <Navigate to="/" />;
}
