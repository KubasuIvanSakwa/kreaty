import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Dashboard from "../pages/Dashboard";
import Portfolio from "../pages/Portfolio";
import Collaborations from "../pages/Collaborations";
import Discover from "../pages/Discover";
import PublicProfile from "../pages/PublicProfile";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-page">Loading...</div>;
  }

  return user ? element : <Navigate to="/discover" replace />;
};

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/discover" element={<Discover />} />
      <Route path="/profile/:username" element={<PublicProfile />} />

      {/* Private Routes */}
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/portfolio" element={<PrivateRoute element={<Portfolio />} />} />
      <Route
        path="/collaborations"
        element={<PrivateRoute element={<Collaborations />} />}
      />

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/discover" replace />} />
      <Route path="*" element={<Navigate to="/discover" replace />} />
    </Routes>
  );
};
