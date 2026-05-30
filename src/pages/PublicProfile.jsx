import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PublicNavbar from "../components/layout/PublicNavbar";
import DiscoverCard from "../components/cards/DiscoverCard";
import { profileService } from "../services/profileService";
import { discoverService } from "../services/discoverService";
import "../styles/pages.scss";

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, [username]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const [profileData, worksData] = await Promise.all([
        profileService.getPublicProfile(username),
        discoverService.getCardsByAuthor(username),
      ]);
      setProfile(profileData);
      setWorks(worksData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading profile:", error);
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="public-profile-page">
        <PublicNavbar />
        <div className="public-profile-content">
          <div className="loading-skeleton"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="public-profile-page">
        <PublicNavbar />
        <div className="public-profile-content">
          <div className="error-state">
            <p>Profile not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="public-profile-page">
      <PublicNavbar />
      <div className="public-profile-content">
        <div className="profile-header">
          <div className="profile-cover"></div>
          <div className="profile-info">
            <div className="profile-avatar-large">
              {profile.name?.charAt(0)}
            </div>
            <div className="profile-details">
              <h1 className="profile-name">{profile.name}</h1>
              <p className="profile-username">@{profile.username}</p>
              <p className="profile-title">{profile.title}</p>
              <p className="profile-date">
                Joined {formatDate(profile.dateJoined)}
              </p>
            </div>

            <div className="profile-actions">
              <button
                className={`btn ${isFollowing ? "btn-secondary" : "btn-primary"}`}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
              <button className="btn btn-secondary">Hire / Book</button>
              <button className="btn btn-secondary">Message</button>
            </div>
          </div>

          <div className="profile-meta">
            {profile.eventsHeld && profile.eventsHeld.length > 0 && (
              <div className="profile-events">
                <h3>Events</h3>
                <div className="events-tags">
                  {profile.eventsHeld.map((event, idx) => (
                    <span key={idx} className="tag">
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profile-works">
          {works.length > 0 && (
            <section className="featured-works">
              <h2>Featured Works</h2>
              <div className="portfolio-grid">
                {works.slice(0, 3).map((work) => (
                  <DiscoverCard key={work.id} card={work} />
                ))}
              </div>
            </section>
          )}

          {works.length > 3 && (
            <section className="all-works">
              <h2>All Works</h2>
              <div className="portfolio-grid">
                {works.map((work) => (
                  <DiscoverCard key={work.id} card={work} />
                ))}
              </div>
            </section>
          )}

          {works.length === 0 && (
            <div className="empty-state">
              <p>No works yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
