import React from 'react';
import './UpcomingEvents.css';

const UpcomingEvents = () => {
  const events = [
    { date: '15', month: 'Tháng 1', title: 'Hội chợ mùa hè 2024', location: 'Công viên Thủ Lệ - Hà Nội', time: '08:00 - 18:00', price: '50.000đ' },
    { date: '28', month: 'Tháng 1', title: 'Workshop chụp ảnh nâng cao', location: 'Studio Ánh Sáng - Hà Nội', time: '14:00 - 17:00', price: '2.000.000đ' },
    { date: '10', month: 'Tháng 2', title: 'Triển lãm tranh nghệ thuật đương đại', location: 'Bảo tàng Mỹ thuật Việt Nam - Hà Nội', time: '09:00 - 21:00', price: '100.000đ' },
    { date: '20', month: 'Tháng 2', title: 'Triển lãm nghệ thuật số', location: 'Trung tâm Triển lãm Giảng Võ - Hà Nội', time: '09:00 - 21:00', price: '200.000đ' },
    { date: '5', month: 'Tháng 3', title: 'Lễ hội ẩm thực quốc tế', location: 'Công viên Thống Nhất - Hà Nội', time: '10:00 - 22:00', price: '100.000đ' },
    { date: '15', month: 'Tháng 3', title: 'Marathon Thành phố 2024', location: 'Trung tâm Thành phố - Hà Nội', time: '05:00 - 12:00', price: '300.000đ' }
  ];

  return (
    <div className="upcoming-events">
      <h3>Lịch Sự Kiện Sắp Tới</h3>
      
      <div className="events-grid">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-date">
              <div className="date-number">{event.date}</div>
              <div className="date-month">{event.month}</div>
            </div>
            <div className="event-content">
              <h4>{event.title}</h4>
              <p className="event-location">{event.location}</p>
              <p className="event-time">{event.time}</p>
              <div className="event-price">{event.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
