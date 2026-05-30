import React from "react";
import { Link } from "react-router-dom";
import "../styles/layout.scss";

const Topbar = ({ user }) => {
  return (
    <header className="topbar">
      <div className="topbar-content">
        <div className="topbar-search">
          <input
            type="text"
            placeholder="Search works, creators, events..."
            className="search-input"
          />
          <span className="search-icon">◈</span>
        </div>

        <div className="topbar-actions">
          <Link to={`/profile/${user?.username}`} className="topbar-profile">
            <span className="profile-avatar">{user?.name?.charAt(0)}</span>
            <span className="profile-name">{user?.name}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
