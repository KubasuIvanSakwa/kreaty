import React, { useState, useEffect } from "react";
import PublicNavbar from "../components/layout/PublicNavbar";
import DiscoverCard from "../components/cards/DiscoverCard";
import { discoverService } from "../services/discoverService";
import "../styles/pages.scss";

const Discover = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", "photography", "film", "music", "design", "art"];

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    filterCards();
  }, [activeFilter, searchQuery]);

  const loadCards = async () => {
    try {
      setLoading(true);
      const data = await discoverService.getAllCards();
      setCards(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading cards:", error);
      setLoading(false);
    }
  };

  const filterCards = async () => {
    try {
      setLoading(true);
      let filtered;

      if (searchQuery) {
        filtered = await discoverService.searchCards(searchQuery);
      } else if (activeFilter !== "all") {
        filtered = await discoverService.getCardsByCategory(activeFilter);
      } else {
        filtered = await discoverService.getAllCards();
      }

      setCards(filtered);
      setLoading(false);
    } catch (error) {
      console.error("Error filtering cards:", error);
      setLoading(false);
    }
  };

  return (
    <div className="discover-page">
      <PublicNavbar />

      <div className="discover-content">
        <div className="discover-header">
          <h1>Discover Creative Works</h1>
          <p className="subtitle">Explore works from Kenyan creatives</p>
        </div>

        <div className="discover-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search works, creators, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-tab ${activeFilter === category ? "active" : ""}`}
                onClick={() => {
                  setActiveFilter(category);
                  setSearchQuery("");
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="discover-grid">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="card-skeleton"></div>
            ))}
          </div>
        ) : cards.length > 0 ? (
          <div className="discover-grid">
            {cards.map((card) => (
              <DiscoverCard key={card.id} card={card} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No works found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
