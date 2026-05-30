import React from "react";
import { Link } from "react-router-dom";
import "../styles/cards.scss";

const DiscoverCard = ({ card, onClick }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="discover-card" onClick={onClick}>
      <div className="card-image-wrapper">
        <img src={card.image} alt={card.name} className="card-image" />
        <div className="card-overlay">
          <span className="card-category">{card.category}</span>
        </div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{card.name}</h3>
        <p className="card-description">{card.description}</p>

        <div className="card-meta">
          {card.author && (
            <Link to={`/profile/${card.authorUsername}`} className="card-author">
              by {card.author}
            </Link>
          )}
          <span className="card-date">{formatDate(card.timeUploaded)}</span>
        </div>

        <div className="card-stats">
          {card.likes !== undefined && (
            <span className="stat">
              <span className="stat-icon">♥</span>
              {card.likes}
            </span>
          )}
          {card.views !== undefined && (
            <span className="stat">
              <span className="stat-icon">◉</span>
              {card.views}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoverCard;
