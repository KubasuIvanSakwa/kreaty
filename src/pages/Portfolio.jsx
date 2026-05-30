import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import DiscoverCard from "../components/cards/DiscoverCard";
import UploadModal from "../components/modals/UploadModal";
import StatsCard from "../components/cards/StatsCard";
import { discoverService } from "../services/discoverService";
import { profileService } from "../services/profileService";
import "../styles/pages.scss";

const Portfolio = () => {
  const { user } = useAuth();
  const [works, setWorks] = useState([]);
  const [stats, setStats] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolioData();
  }, [user]);

  const loadPortfolioData = async () => {
    try {
      const [worksData, statsData] = await Promise.all([
        discoverService.getCardsByAuthor(user?.username),
        profileService.getStats(),
      ]);
      setWorks(worksData);
      setStats(statsData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading portfolio:", error);
      setLoading(false);
    }
  };

  const handleUpload = async (formData) => {
    const newWork = {
      id: `card_${Date.now()}`,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
      timeUploaded: new Date(),
      timeUpdated: new Date(),
      likes: 0,
      views: 0,
      author: user?.name,
      authorUsername: user?.username,
    };
    setWorks([newWork, ...works]);
  };

  if (loading) {
    return (
      <div className="portfolio-page">
        <Sidebar />
        <div className="portfolio-main">
          <Topbar user={user} />
          <div className="portfolio-content">
            <div className="loading-skeleton"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <Sidebar />
      <div className="portfolio-main">
        <Topbar user={user} />
        <div className="portfolio-content">
          <div className="portfolio-header">
            <h1>Your Portfolio</h1>
            <p className="subtitle">Manage and showcase your creative works</p>
          </div>

          <div className="portfolio-stats">
            <StatsCard
              icon="◉"
              label="Total Works"
              value={works.length}
            />
            <StatsCard
              icon="♥"
              label="Total Likes"
              value={works.reduce((sum, w) => sum + (w.likes || 0), 0)}
            />
            <StatsCard
              icon="◈"
              label="Total Views"
              value={works.reduce((sum, w) => sum + (w.views || 0), 0)}
            />
          </div>

          <div className="portfolio-upload-section">
            <button
              className="upload-cta"
              onClick={() => setIsUploadOpen(true)}
            >
              <h3>Upload Your Next Work</h3>
              <p>Share your latest creation with the community</p>
            </button>
          </div>

          {works.length > 0 ? (
            <div className="portfolio-grid">
              {works.map((work) => (
                <DiscoverCard key={work.id} card={work} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Your portfolio is empty</p>
              <p className="subtitle">Upload your first work to get started</p>
            </div>
          )}

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

export default Portfolio;
