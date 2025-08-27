import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedLayout() {
  const { token } = useAuth();

  // Redirect to login if not authenticated
  if (!token) return <Navigate to="/admin/auth" replace />;

  return (
    <div>
      {/* You can add nav/header here */}
      <Outlet />
    </div>
  );
}
