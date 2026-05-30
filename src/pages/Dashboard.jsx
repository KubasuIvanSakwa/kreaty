import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import StatsCard from "../components/cards/StatsCard";
import DiscoverCard from "../components/cards/DiscoverCard";
import UploadModal from "../components/modals/UploadModal";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { profileService } from "../services/profileService";
import { collaborationService } from "../services/collaborationService";
import "../styles/pages.scss";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [collaborations, setCollaborations] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, collabData] = await Promise.all([
        profileService.getStats(),
        collaborationService.getAllCollaborations(),
      ]);
      setStats(statsData);
      setCollaborations(collabData.filter((c) => c.status === "pending"));
      setLoading(false);
    } catch (error) {
      console.error("Error loading dashboard:", error);
      setLoading(false);
    }
  };

  const handleUpload = (formData) => {
    console.log("Uploading:", formData);
  };

  const handleAcceptCollab = async (collabId) => {
    try {
      await collaborationService.acceptCollaboration(collabId);
      setCollaborations(
        collaborations.filter((c) => c.id !== collabId)
      );
    } catch (error) {
      console.error("Error accepting collaboration:", error);
    }
  };

  const handleRejectCollab = async (collabId) => {
    try {
      await collaborationService.rejectCollaboration(collabId);
      setCollaborations(
        collaborations.filter((c) => c.id !== collabId)
      );
    } catch (error) {
      console.error("Error rejecting collaboration:", error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-main">
          <Topbar user={user} />
          <div className="dashboard-content">
            <div className="loading-skeleton"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Topbar user={user} />
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Welcome back, {user?.name}!</h1>
            <p className="subtitle">
              Here's your creative performance overview
            </p>
          </div>

          <div className="stats-grid">
            <StatsCard
              icon="$"
              label="Total Earnings"
              value={stats?.earnings || 0}
              unit=" KES"
              trend={{ type: "up", percentage: 12 }}
            />
            <StatsCard
              icon="◉"
              label="Works Uploaded"
              value={stats?.worksUploaded || 0}
              trend={{ type: "up", percentage: 5 }}
            />
            <StatsCard
              icon="◈"
              label="Profile Views"
              value={stats?.profileViews || 0}
              trend={{ type: "up", percentage: 23 }}
            />
            <StatsCard
              icon="⬡"
              label="Collaborations"
              value={stats?.collaborations || 0}
              trend={{ type: "up", percentage: 8 }}
            />
          </div>

          <div className="dashboard-grid">
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Earnings Chart</h2>
              </div>
              <div className="earnings-chart">
                {stats?.monthlyEarnings?.map((item) => (
                  <div key={item.month} className="chart-bar-item">
                    <div className="chart-bar-wrapper">
                      <div
                        className="chart-bar"
                        style={{
                          height: `${(item.amount / 15000) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="chart-label">{item.month}</span>
                    <span className="chart-value">
                      {(item.amount / 1000).toFixed(1)}k
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="dashboard-section">
              <div className="section-header">
                <h2>Pending Collaborations</h2>
                <span className="badge">{collaborations.length}</span>
              </div>
              <div className="collaborations-list">
                {collaborations.length > 0 ? (
                  collaborations.map((collab) => (
                    <div key={collab.id} className="collab-item">
                      <div className="collab-info">
                        <h4>{collab.username}</h4>
                        <p className="collab-title">{collab.title}</p>
                        <p className="collab-project">{collab.collaboratedOn}</p>
                      </div>
                      <div className="collab-actions">
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => handleAcceptCollab(collab.id)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-secondary btn-small"
                          onClick={() => handleRejectCollab(collab.id)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No pending collaborations</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <section className="dashboard-section">
            <div className="section-header">
              <h2>Your Latest Works</h2>
              <button
                className="btn btn-primary btn-small"
                onClick={() => setIsUploadOpen(true)}
              >
                + Upload
              </button>
            </div>
            <div className="portfolio-grid">
              {[1, 2, 3].map((index) => (
                <div key={index} className="card-skeleton"></div>
              ))}
            </div>
          </section>

          <UploadModal
            isOpen={isUploadOpen}
            onClose={() => setIsUploadOpen(false)}
            onSubmit={handleUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
