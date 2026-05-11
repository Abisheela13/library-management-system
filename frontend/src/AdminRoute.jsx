import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" />;
  }

  // NOT ADMIN
  if (user.role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default AdminRoute;