import React from 'react';
import './StatsCards.css';

const StatsCards = () => {
  const stats = [
    { label: 'Tổng sự kiện', value: '10', change: '+20% so với tháng trước', color: '#7c3aed' },
    { label: 'Tổng vé bán', value: '34', change: '-10% so với tháng trước', color: '#ec4899' },
    { label: 'Tổng doanh thu', value: '16.200.000đ', change: '+10% so với tháng trước', color: '#06b6d4' },
    { label: 'Lợi nhuận ròng', value: '8', change: 'Tổng lợi nhuận vé', color: '#8b5cf6' }
  ];

  return (
    <div className="stats-section">
      <h2>Tổng Quan Hệ Thống</h2>
      <p className="stats-subtitle">Thống kê về doanh số bán vé trong tháng này</p>
      
      <div className="stats-cards">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-change">{stat.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
