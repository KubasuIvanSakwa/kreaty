import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { collaborationService } from "../services/collaborationService";
import "../styles/pages.scss";

const Collaborations = () => {
  const { user } = useAuth();
  const [collaborations, setCollaborations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const statuses = ["all", "pending", "accepted", "rejected"];

  useEffect(() => {
    loadCollaborations();
  }, []);

  useEffect(() => {
    filterCollaborations();
  }, [activeFilter]);

  const loadCollaborations = async () => {
    try {
      setLoading(true);
      const data = await collaborationService.getAllCollaborations();
      setCollaborations(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading collaborations:", error);
      setLoading(false);
    }
  };

  const filterCollaborations = async () => {
    try {
      setLoading(true);
      const data = await collaborationService.getCollaborationsByStatus(
        activeFilter
      );
      setCollaborations(data);
      setLoading(false);
    } catch (error) {
      console.error("Error filtering collaborations:", error);
      setLoading(false);
    }
  };

  const handleAccept = async (collabId) => {
    try {
      await collaborationService.acceptCollaboration(collabId);
      filterCollaborations();
    } catch (error) {
      console.error("Error accepting collaboration:", error);
    }
  };

  const handleReject = async (collabId) => {
    try {
      await collaborationService.rejectCollaboration(collabId);
      filterCollaborations();
    } catch (error) {
      console.error("Error rejecting collaboration:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "accepted":
        return "badge badge-success";
      case "pending":
        return "badge badge-warning";
      case "rejected":
        return "badge badge-danger";
      default:
        return "badge";
    }
  };

  if (loading) {
    return (
      <div className="collaborations-page">
        <Sidebar />
        <div className="collaborations-main">
          <Topbar user={user} />
          <div className="collaborations-content">
            <div className="loading-skeleton"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="collaborations-page">
      <Sidebar />
      <div className="collaborations-main">
        <Topbar user={user} />
        <div className="collaborations-content">
          <div className="collaborations-header">
            <h1>Collaborations</h1>
            <p className="subtitle">Manage your creative partnerships</p>
          </div>

          <div className="collab-filters">
            {statuses.map((status) => (
              <button
                key={status}
                className={`filter-tab ${activeFilter === status ? "active" : ""}`}
                onClick={() => setActiveFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {collaborations.length > 0 ? (
            <div className="collaborations-list">
              {collaborations.map((collab) => (
                <div key={collab.id} className="collab-card">
                  <div className="collab-header">
                    <div className="collab-identity">
                      <h3 className="collab-username">{collab.username}</h3>
                      <p className="collab-title">{collab.title}</p>
                      <p className="collab-email">{collab.email}</p>
                    </div>
                    <span className={getStatusBadgeClass(collab.status)}>
                      {collab.status}
                    </span>
                  </div>

                  <div className="collab-body">
                    <div className="collab-project-info">
                      <h4>Project</h4>
                      <p>{collab.collaboratedOn}</p>
                    </div>
                    <div className="collab-date-info">
                      <h4>Date</h4>
                      <p>{formatDate(collab.dateCollaborated)}</p>
                    </div>
                  </div>

                  {collab.status === "pending" && (
                    <div className="collab-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAccept(collab.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleReject(collab.id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No {activeFilter !== "all" ? activeFilter : ""} collaborations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collaborations;
