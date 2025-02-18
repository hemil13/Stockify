import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import StockManagement from './components/stockManagement';
import AttendanceManagement from './components/attendanceManagement';
import PriceList from './components/priceListManagement';
import './App.css'; // Importing main CSS for global styles

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<StockManagement />} />
          <Route path="/attendance" element={<AttendanceManagement />} />
          <Route path="/price-list" element={<PriceList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
