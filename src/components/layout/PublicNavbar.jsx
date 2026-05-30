import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../styles/layout.scss";

const PublicNavbar = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const mockUser = {
      id: "user_1",
      name: "Collins Kipchoge",
      username: "collinski",
      email: "collins@creativehub.ke",
      title: "Filmmaker & Videographer",
    };
    login(mockUser);
    navigate("/dashboard");
  };

  return (
    <nav className="public-navbar">
      <div className="navbar-container">
        <Link to="/discover" className="navbar-brand">
          <span className="brand-letter">K</span>
          <span className="brand-text">kreaty</span>
        </Link>
        <div className="navbar-center">
          <Link to="/discover" className="navbar-link">
            Discover
          </Link>
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/dashboard" className="navbar-link">
                Dashboard
              </Link>
              <button
                className="btn btn-secondary btn-small"
                onClick={() => {
                  logout();
                  navigate("/discover");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-primary btn-small" onClick={handleLogin}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
