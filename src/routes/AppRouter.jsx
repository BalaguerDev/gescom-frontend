import { Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "@/auth";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

const AppRouter = () => (
  <Routes>
    {/* Redirección raíz */}
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* Rutas públicas */}
    <Route path="/login" element={<Login />} />

    {/* Rutas protegidas */}
    <Route
      path="/dashboard"
      element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      }
    />

    {/* Fallback para rutas no encontradas */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AppRouter;
