import React from "react";
import "../styles/cards.scss";

const StatsCard = ({ icon, label, value, unit = "", trend = null }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-header">
        <span className="stats-icon">{icon}</span>
        <span className="stats-label">{label}</span>
      </div>

      <div className="stats-card-value">
        <h2 className="value">
          {value.toLocaleString()}
          {unit && <span className="unit">{unit}</span>}
        </h2>
        {trend && (
          <span className={`trend ${trend.type}`}>
            {trend.type === "up" ? "↑" : "↓"} {trend.percentage}%
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
