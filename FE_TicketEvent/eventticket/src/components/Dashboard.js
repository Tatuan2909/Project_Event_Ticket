import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ events, tickets, currentPage, setCurrentPage, setEvents, setTickets }) => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [eventForm, setEventForm] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    price: '',
    totalTickets: '',
    status: 'upcoming',
    image: ''
  });

  const [ticketForm, setTicketForm] = useState({
    eventId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    quantity: 1
  });

  // Tính toán thống kê
  const stats = {
    totalEvents: events.length,
    totalTicketsSold: tickets.reduce((sum, ticket) => sum + ticket.quantity, 0),
    totalRevenue: tickets.reduce((sum, ticket) => sum + ticket.totalPrice, 0),
    upcomingEvents: events.filter(e => e.status === 'upcoming').length
  };

  // Xử lý thêm sự kiện
  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      id: events.length + 1,
      ...eventForm,
      price: parseFloat(eventForm.price),
      totalTickets: parseInt(eventForm.totalTickets),
      soldTickets: 0
    };
    setEvents([...events, newEvent]);
    setEventForm({
      name: '',
      description: '',
      date: '',
      location: '',
      price: '',
      totalTickets: '',
      status: 'upcoming',
      image: ''
    });
    setShowEventForm(false);
  };

  // Xử lý bán vé
  const handleSellTicket = (e) => {
    e.preventDefault();
    const event = events.find(ev => ev.id === parseInt(ticketForm.eventId));
    if (!event) return;

    const newTicket = {
      id: tickets.length + 1,
      ...ticketForm,
      eventId: parseInt(ticketForm.eventId),
      quantity: parseInt(ticketForm.quantity),
      totalPrice: event.price * parseInt(ticketForm.quantity),
      purchaseDate: new Date().toISOString(),
      status: 'confirmed'
    };

    setTickets([...tickets, newTicket]);
    
    // Cập nhật số vé đã bán
    setEvents(events.map(ev => 
      ev.id === parseInt(ticketForm.eventId)
        ? { ...ev, soldTickets: ev.soldTickets + parseInt(ticketForm.quantity) }
        : ev
    ));

    setTicketForm({
      eventId: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      quantity: 1
    });
    setShowTicketForm(false);
  };

  // Lọc sự kiện
  const filteredEvents = events.filter(event => {
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Render trang chủ
  const renderHomePage = () => (
    <div className="home-content">
      <div className="stats-grid">
        <div className="stat-card stat-card-1">
          <div className="stat-label">Tổng Sự Kiện</div>
          <div className="stat-value">{stats.totalEvents}</div>
          <div className="stat-change positive">+12% so với tháng trước</div>
        </div>

        <div className="stat-card stat-card-2">
          <div className="stat-label">Vé Đã Bán</div>
          <div className="stat-value">{stats.totalTicketsSold}</div>
          <div className="stat-change positive">+28% so với tháng trước</div>
        </div>

        <div className="stat-card stat-card-3">
          <div className="stat-label">Doanh Thu</div>
          <div className="stat-value">{stats.totalRevenue.toLocaleString('vi-VN')}đ</div>
          <div className="stat-change positive">+35% so với tháng trước</div>
        </div>

        <div className="stat-card stat-card-4">
          <div className="stat-label">Sự Kiện Sắp Tới</div>
          <div className="stat-value">{stats.upcomingEvents}</div>
          <div className="stat-change neutral">Trong 30 ngày tới</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Top 5 Sự Kiện Bán Chạy</h3>
            <span className="view-all" onClick={() => setCurrentPage('events')}>Xem tất cả</span>
          </div>
          <div className="top-events-list">
            {[...events]
              .sort((a, b) => b.soldTickets - a.soldTickets)
              .slice(0, 5)
              .map((event, index) => {
                const percentage = (event.soldTickets / event.totalTickets) * 100;
                return (
                  <div key={event.id} className="top-event-item">
                    <div className="event-rank">{index + 1}</div>
                    {event.image && (
                      <div className="event-thumbnail" style={{ backgroundImage: `url(${event.image})` }} />
                    )}
                    <div className="event-info">
                      <div className="event-name">{event.name}</div>
                      <div className="event-meta">
                        {event.location} • {new Date(event.date).toLocaleDateString('vi-VN')}
                      </div>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="progress-text">{percentage.toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="event-stats">
                      <div className="stat-item">
                        <span className="stat-number">{event.soldTickets}</span>
                        <span className="stat-label">Đã bán</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h3>Giao Dịch Gần Đây</h3>
            <span className="view-all" onClick={() => setCurrentPage('tickets')}>Xem tất cả</span>
          </div>
          <div className="recent-transactions">
            {tickets.slice(0, 5).map(ticket => {
              const event = events.find(e => e.id === ticket.eventId);
              return (
                <div key={ticket.id} className="transaction-item">
                  <div className="transaction-info">
                    <div className="transaction-customer">{ticket.customerName}</div>
                    <div className="transaction-event">{event?.name}</div>
                    <div className="transaction-date">
                      {new Date(ticket.purchaseDate).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                  <div className="transaction-amount">
                    <div className="amount-value">{ticket.totalPrice.toLocaleString('vi-VN')}đ</div>
                    <div className="amount-quantity">{ticket.quantity} vé</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="dashboard-section full-width">
        <div className="section-header">
          <h3>Lịch Sự Kiện Sắp Tới</h3>
        </div>
        <div className="calendar-events">
          {events
            .filter(e => e.status === 'upcoming')
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 6)
            .map(event => (
              <div key={event.id} className="calendar-event-card">
                {event.image && (
                  <div className="calendar-event-image" style={{ backgroundImage: `url(${event.image})` }} />
                )}
                <div className="calendar-date">
                  <div className="date-day">{new Date(event.date).getDate()}</div>
                  <div className="date-month">
                    Tháng {new Date(event.date).getMonth() + 1}
                  </div>
                </div>
                <div className="calendar-event-info">
                  <h4>{event.name}</h4>
                  <p className="event-location">{event.location}</p>
                  <div className="event-ticket-info">
                    <span className="ticket-sold">{event.soldTickets}/{event.totalTickets} vé</span>
                    <span className="ticket-price">{event.price.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // Render trang quản lý sự kiện
  const renderEventsPage = () => (
    <div className="events-content">
      <div className="page-header">
        <div>
          <h2>Quản Lý Sự Kiện</h2>
          <p className="page-subtitle">Tạo và quản lý các sự kiện của bạn</p>
        </div>
        <button className="btn-primary" onClick={() => setShowEventForm(true)}>
          Thêm Sự Kiện Mới
        </button>
      </div>

      <div className="filter-bar">
        <input 
          type="text" 
          placeholder="Tìm kiếm sự kiện..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="upcoming">Sắp diễn ra</option>
          <option value="ongoing">Đang diễn ra</option>
          <option value="completed">Đã kết thúc</option>
        </select>
      </div>

      <div className="events-grid">
        {filteredEvents.map(event => {
          const soldPercentage = (event.soldTickets / event.totalTickets) * 100;
          const revenue = event.soldTickets * event.price;
          const statusBadges = {
            upcoming: { text: 'Sắp diễn ra', className: 'badge-upcoming' },
            ongoing: { text: 'Đang diễn ra', className: 'badge-ongoing' },
            completed: { text: 'Đã kết thúc', className: 'badge-completed' }
          };
          const badge = statusBadges[event.status];

          return (
            <div key={event.id} className="event-card">
              <div className="event-card-header">
                {event.image && (
                  <div className="event-image" style={{ backgroundImage: `url(${event.image})` }} />
                )}
                <span className={`badge ${badge.className}`}>{badge.text}</span>
              </div>

              <div className="event-content">
                <h3>{event.name}</h3>
                <p className="event-description">{event.description}</p>

                <div className="event-details">
                  <div className="detail-row">
                    <span className="detail-label">Ngày diễn ra</span>
                    <span className="detail-value">{new Date(event.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Địa điểm</span>
                    <span className="detail-value">{event.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Giá vé</span>
                    <span className="detail-value price-value">{event.price.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>

                <div className="ticket-progress">
                  <div className="progress-header">
                    <span className="progress-label">Tình trạng vé</span>
                    <span className="progress-numbers">{event.soldTickets}/{event.totalTickets}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${soldPercentage}%` }}
                    />
                  </div>
                  <div className="progress-footer">
                    <span className="progress-percentage">{soldPercentage.toFixed(1)}% đã bán</span>
                    <span className="progress-revenue">Doanh thu: {revenue.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>

                <div className="event-actions">
                  <button className="btn-secondary">Chỉnh sửa</button>
                  <button className="btn-secondary" onClick={() => {
                    setTicketForm({ ...ticketForm, eventId: event.id.toString() });
                    setShowTicketForm(true);
                  }}>Bán vé</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showEventForm && (
        <div className="modal-overlay" onClick={() => setShowEventForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Thêm Sự Kiện Mới</h3>
              <button className="close-btn" onClick={() => setShowEventForm(false)}>×</button>
            </div>
            <form onSubmit={handleAddEvent}>
              <div className="form-group">
                <label>Tên sự kiện</label>
                <input 
                  type="text" 
                  required
                  value={eventForm.name}
                  onChange={(e) => setEventForm({...eventForm, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Mô tả</label>
                <textarea 
                  required
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ngày diễn ra</label>
                  <input 
                    type="date" 
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Địa điểm</label>
                  <input 
                    type="text" 
                    required
                    value={eventForm.location}
                    onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Giá vé (VNĐ)</label>
                  <input 
                    type="number" 
                    required
                    value={eventForm.price}
                    onChange={(e) => setEventForm({...eventForm, price: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Số lượng vé</label>
                  <input 
                    type="number" 
                    required
                    value={eventForm.totalTickets}
                    onChange={(e) => setEventForm({...eventForm, totalTickets: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Trạng thái</label>
                <select 
                  value={eventForm.status}
                  onChange={(e) => setEventForm({...eventForm, status: e.target.value})}
                >
                  <option value="upcoming">Sắp diễn ra</option>
                  <option value="ongoing">Đang diễn ra</option>
                  <option value="completed">Đã kết thúc</option>
                </select>
              </div>
              <div className="form-group">
                <label>URL Hình ảnh (tùy chọn)</label>
                <input 
                  type="url" 
                  placeholder="https://example.com/image.jpg"
                  value={eventForm.image}
                  onChange={(e) => setEventForm({...eventForm, image: e.target.value})}
                />
                {eventForm.image && (
                  <div className="image-preview">
                    <img src={eventForm.image} alt="Preview" />
                  </div>
                )}
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowEventForm(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  Thêm Sự Kiện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // Render trang quản lý vé
  const renderTicketsPage = () => (
    <div className="tickets-content">
      <div className="page-header">
        <div>
          <h2>Quản Lý Vé</h2>
          <p className="page-subtitle">Theo dõi và quản lý các giao dịch bán vé</p>
        </div>
        <button className="btn-primary" onClick={() => setShowTicketForm(true)}>
          Bán Vé Mới
        </button>
      </div>

      <div className="tickets-table">
        <table>
          <thead>
            <tr>
              <th>Mã vé</th>
              <th>Khách hàng</th>
              <th>Sự kiện</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
              <th>Ngày mua</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => {
              const event = events.find(e => e.id === ticket.eventId);
              return (
                <tr key={ticket.id}>
                  <td>#{ticket.id.toString().padStart(5, '0')}</td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-name">{ticket.customerName}</div>
                      <div className="customer-contact">{ticket.customerEmail}</div>
                    </div>
                  </td>
                  <td>{event?.name}</td>
                  <td>{ticket.quantity} vé</td>
                  <td className="price-cell">{ticket.totalPrice.toLocaleString('vi-VN')}đ</td>
                  <td>{new Date(ticket.purchaseDate).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <span className="badge badge-success">Đã xác nhận</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showTicketForm && (
        <div className="modal-overlay" onClick={() => setShowTicketForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Bán Vé Mới</h3>
              <button className="close-btn" onClick={() => setShowTicketForm(false)}>×</button>
            </div>
            <form onSubmit={handleSellTicket}>
              <div className="form-group">
                <label>Chọn sự kiện</label>
                <select 
                  required
                  value={ticketForm.eventId}
                  onChange={(e) => setTicketForm({...ticketForm, eventId: e.target.value})}
                >
                  <option value="">-- Chọn sự kiện --</option>
                  {events.filter(e => e.soldTickets < e.totalTickets).map(event => (
                    <option key={event.id} value={event.id}>
                      {event.name} - {event.price.toLocaleString('vi-VN')}đ
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Tên khách hàng</label>
                <input 
                  type="text" 
                  required
                  value={ticketForm.customerName}
                  onChange={(e) => setTicketForm({...ticketForm, customerName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  required
                  value={ticketForm.customerEmail}
                  onChange={(e) => setTicketForm({...ticketForm, customerEmail: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input 
                  type="tel" 
                  required
                  value={ticketForm.customerPhone}
                  onChange={(e) => setTicketForm({...ticketForm, customerPhone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Số lượng vé</label>
                <input 
                  type="number" 
                  min="1"
                  required
                  value={ticketForm.quantity}
                  onChange={(e) => setTicketForm({...ticketForm, quantity: e.target.value})}
                />
              </div>
              {ticketForm.eventId && (
                <div className="form-summary">
                  <div className="summary-row">
                    <span>Giá vé:</span>
                    <span>{events.find(e => e.id === parseInt(ticketForm.eventId))?.price.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng cộng:</span>
                    <span>{(events.find(e => e.id === parseInt(ticketForm.eventId))?.price * ticketForm.quantity).toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              )}
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowTicketForm(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  Xác Nhận Bán Vé
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>EventTicket</h1>
          <p>Hệ thống quản lý</p>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            Tổng quan
          </button>
          <button 
            className={`nav-item ${currentPage === 'events' ? 'active' : ''}`}
            onClick={() => setCurrentPage('events')}
          >
            Quản lý sự kiện
          </button>
          <button 
            className={`nav-item ${currentPage === 'tickets' ? 'active' : ''}`}
            onClick={() => setCurrentPage('tickets')}
          >
            Quản lý vé
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">AD</div>
            <div className="user-details">
              <div className="user-name">Admin</div>
              <div className="user-role">Quản trị viên</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <h2>
            {currentPage === 'dashboard' && 'Tổng Quan Hệ Thống'}
            {currentPage === 'events' && 'Quản Lý Sự Kiện'}
            {currentPage === 'tickets' && 'Quản Lý Vé'}
          </h2>
          <div className="header-actions">
            <span className="current-date">
              {new Date().toLocaleDateString('vi-VN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </header>

        <div className="content-area">
          {currentPage === 'dashboard' && renderHomePage()}
          {currentPage === 'events' && renderEventsPage()}
          {currentPage === 'tickets' && renderTicketsPage()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
