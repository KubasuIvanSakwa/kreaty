import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Import your pages here
// import HomePage from "../pages/Home";
// import DashboardPage from "../pages/Dashboard";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-page">Loading...</div>;
  }

  return user ? element : <Navigate to="/" replace />;
};

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<h1>Welcome to kreaty</h1>} />

      {/* Private Routes */}
      {/* <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} /> */}

      {/* Default Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
