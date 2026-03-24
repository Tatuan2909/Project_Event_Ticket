import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">🎫</div>
        <span>TicketGo</span>
      </div>
      
      <nav className="nav-menu">
        <div className="nav-item active">
          <span className="icon">📊</span>
          <span>Bảo cao</span>
        </div>
        <div className="nav-item">
          <span className="icon">📅</span>
          <span>Quản lý sự kiện & vé</span>
        </div>
        <div className="nav-item">
          <span className="icon">👥</span>
          <span>Quản lý khách hàng</span>
        </div>
        <div className="nav-item">
          <span className="icon">📝</span>
          <span>Quản lý thông báo</span>
        </div>
        <div className="nav-item">
          <span className="icon">🎨</span>
          <span>Quản lý bài viết nổi bật</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
