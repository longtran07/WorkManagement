import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import '../../src/styles/Layout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Outlet /> {/* Hiển thị nội dung của từng Route con */}
      </div>
      <ToastContainer />
    </div>
  );
};


export default DashboardLayout;