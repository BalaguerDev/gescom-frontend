import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import RequireAuth from "@/auth/RequireAuth";

const AppRouter = () => (
  <Routes>
    {/* Redirige la raíz hacia /dashboard */}
    <Route path="/" element={<Navigate to="/dashboard" replace />} />

    {/* Dashboard protegido */}
    <Route
      path="/dashboard"
      element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      }
    />

    {/* Cualquier ruta no válida → /dashboard */}
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default AppRouter;
