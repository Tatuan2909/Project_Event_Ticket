import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Dữ liệu mẫu sự kiện
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Hòa nhạc mùa hè 2024',
      description: 'Đêm nhạc sôi động với các nghệ sĩ hàng đầu',
      date: '2024-07-15',
      location: 'Nhà hát Lớn Hà Nội',
      price: 500000,
      totalTickets: 1000,
      soldTickets: 750,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=500&fit=crop'
    },
    {
      id: 2,
      name: 'Triển lãm nghệ thuật đương đại',
      description: 'Khám phá nghệ thuật hiện đại Việt Nam',
      date: '2024-08-20',
      location: 'Bảo tàng Mỹ thuật TP.HCM',
      price: 200000,
      totalTickets: 500,
      soldTickets: 320,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&h=500&fit=crop'
    },
    {
      id: 3,
      name: 'Festival ẩm thực quốc tế',
      description: 'Trải nghiệm hương vị từ khắp thế giới',
      date: '2024-09-10',
      location: 'Công viên Thống Nhất',
      price: 150000,
      totalTickets: 2000,
      soldTickets: 1850,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=500&fit=crop'
    },
    {
      id: 4,
      name: 'Hội thảo công nghệ AI 2024',
      description: 'Xu hướng trí tuệ nhân tạo và tương lai',
      date: '2024-06-25',
      location: 'Trung tâm Hội nghị Quốc gia',
      price: 800000,
      totalTickets: 300,
      soldTickets: 280,
      status: 'ongoing',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop'
    },
    {
      id: 5,
      name: 'Đêm nhạc acoustic',
      description: 'Âm nhạc nhẹ nhàng, thư giãn',
      date: '2024-05-10',
      location: 'Cafe Acoustic Hà Nội',
      price: 300000,
      totalTickets: 150,
      soldTickets: 150,
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=500&fit=crop'
    }
  ]);

  // Dữ liệu mẫu vé đã bán
  const [tickets, setTickets] = useState([
    {
      id: 1,
      eventId: 1,
      customerName: 'Nguyễn Văn An',
      customerEmail: 'an.nguyen@email.com',
      customerPhone: '0901234567',
      quantity: 2,
      totalPrice: 1000000,
      purchaseDate: '2024-06-15T10:30:00',
      status: 'confirmed'
    },
    {
      id: 2,
      eventId: 1,
      customerName: 'Trần Thị Bình',
      customerEmail: 'binh.tran@email.com',
      customerPhone: '0912345678',
      quantity: 4,
      totalPrice: 2000000,
      purchaseDate: '2024-06-16T14:20:00',
      status: 'confirmed'
    },
    {
      id: 3,
      eventId: 2,
      customerName: 'Lê Hoàng Cường',
      customerEmail: 'cuong.le@email.com',
      customerPhone: '0923456789',
      quantity: 1,
      totalPrice: 200000,
      purchaseDate: '2024-06-17T09:15:00',
      status: 'confirmed'
    },
    {
      id: 4,
      eventId: 3,
      customerName: 'Phạm Minh Đức',
      customerEmail: 'duc.pham@email.com',
      customerPhone: '0934567890',
      quantity: 3,
      totalPrice: 450000,
      purchaseDate: '2024-06-18T16:45:00',
      status: 'confirmed'
    },
    {
      id: 5,
      eventId: 4,
      customerName: 'Hoàng Thị Em',
      customerEmail: 'em.hoang@email.com',
      customerPhone: '0945678901',
      quantity: 2,
      totalPrice: 1600000,
      purchaseDate: '2024-06-19T11:00:00',
      status: 'confirmed'
    }
  ]);

  return (
    <div className="App">
      <Dashboard 
        events={events} 
        tickets={tickets}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setEvents={setEvents}
        setTickets={setTickets}
      />
    </div>
  );
}

export default App;
