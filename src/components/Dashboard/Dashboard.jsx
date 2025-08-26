import React, { useEffect, useState } from "react";
import "./Dashboard.scss";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    totalAnalysis: 0,
    todayVisitors: 0,
    todayAnalysis: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_URL || "";
    fetch(`${API_BASE}/api/stats`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setStats({
          totalVisitors: data.totalVisitors || 0,
          totalAnalysis: data.totalAnalysis || 0,
          todayVisitors: data.todayVisitors || 0,
          todayAnalysis: data.todayAnalysis || 0,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load statistics.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="stats">
      <div className="stats-inner">
        {loading ? (
          <div className="stats-container">
            <div className="stats-card">
              <div className="stats-label"></div>
              <div className="stats-value"></div>
            </div>
            <div className="stats-card">
              <div className="stats-label"></div>
              <div className="stats-value"></div>
            </div>
            <div className="stats-card">
              <div className="stats-label"></div>
              <div className="stats-value"></div>
            </div>
            <div className="stats-card">
              <div className="stats-label"></div>
              <div className="stats-value"></div>
            </div>
          </div>
        ) : error ? (
          <div className="stats-state stats-state-error">{error}</div>
        ) : (
          <div className="stats-container">
            <div className="stats-card">
              <div className="stats-label">Total Visitors</div>
              <div className="stats-value">
                {stats.totalVisitors.toLocaleString()}
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-label">Today's Visitors</div>
              <div className="stats-value">
                {stats.todayVisitors.toLocaleString()}
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-label">Total Analysis</div>
              <div className="stats-value">
                {stats.totalAnalysis.toLocaleString()}
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-label">Today's Analysis</div>
              <div className="stats-value">
                {stats.todayAnalysis.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
