import { Navigate, Outlet } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedLayout() {
  const { token, checkTokenExpiration } = useAuth();

  useEffect(() => {
    checkTokenExpiration();
  }, [checkTokenExpiration]);

  // Redirect to login if not authenticated
  if (!token) return <Navigate to="/admin/auth" replace />;

  return (
    <div>
      <Outlet />
    </div>
  );
}
