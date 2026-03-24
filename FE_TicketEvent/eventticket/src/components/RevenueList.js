import React from 'react';
import './RevenueList.css';

const RevenueList = () => {
  const revenues = [
    { name: 'Nguyễn Văn An', date: 'Mua 2 vé vào 16 - 10:24', amount: '1.600.000đ', type: 'Vé' },
    { name: 'Trần Thị Bình', date: 'Mua 4 vé vào 04-10-2024', amount: '2.000.000đ', type: 'Vé' },
    { name: 'Lê Hoàng Cường', date: 'Mua 1 vé vào 8 tháng trước', amount: '200.000đ', type: 'Vé' },
    { name: 'Huỳnh Minh Đức', date: '18 vé đã được bán vào 24', amount: '410.000đ', type: 'Vé' },
    { name: 'Hoàng Thị Ên', date: 'Mua 2 vé vào ngày 04-10-2024', amount: '1.200.000đ', type: 'Vé' }
  ];

  return (
    <div className="revenue-list">
      <div className="section-header">
        <h3>Giao Dịch Gần Đây</h3>
        <a href="#" className="view-all">Xem tất cả &gt;</a>
      </div>
      
      <div className="revenue-items">
        {revenues.map((revenue, index) => (
          <div key={index} className="revenue-item">
            <div className="revenue-info">
              <h4>{revenue.name}</h4>
              <p>{revenue.date}</p>
            </div>
            <div className="revenue-amount">
              <div className="amount">{revenue.amount}</div>
              <div className="type">{revenue.type}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueList;
