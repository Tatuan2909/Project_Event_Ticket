import React from 'react';
import './TopEvents.css';

const TopEvents = () => {
  const events = [
    { id: 1, name: 'Lễ hội Nhạc Hội Chay', date: 'Sân vận động Mỹ Đình - 9-10C - 20/11/2027', sold: 3600, total: 4000, progress: 90 },
    { id: 2, name: 'Đêm nhạc Trịnh Công Sơn', date: 'Cung văn hóa Hữu Nghị - Hà Nội - 27/12/2027', sold: 1500, total: 1600, progress: 90 },
    { id: 3, name: 'Marathon Thành phố HCM', date: 'Thành phố Hồ Chí Minh - 15/12/2028', sold: 1200, total: 1500, progress: 80 },
    { id: 4, name: 'Triển lãm nghệ thuật số', date: 'Trung tâm Triển lãm Giảng Võ - Hà Nội - 9/10/2025', sold: 850, total: 1000, progress: 85 },
    { id: 5, name: 'Hội thảo công nghệ AI 2025', date: 'Trung tâm Hội nghị Quốc gia Hà Nội - 07/7/2025', sold: 720, total: 800, progress: 90 }
  ];

  return (
    <div className="top-events">
      <div className="section-header">
        <h3>Top 5 Sự Kiện Bán Chạy</h3>
        <a href="#" className="view-all">Xem tất cả &gt;</a>
      </div>
      
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <div className="event-number">{event.id}</div>
            <div className="event-details">
              <h4>{event.name}</h4>
              <p>{event.date}</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${event.progress}%` }}></div>
              </div>
            </div>
            <div className="event-stats">
              <div className="sold-count">{event.sold}</div>
              <div className="sold-label">đã bán</div>
              <div className="progress-percent">{event.progress}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEvents;
