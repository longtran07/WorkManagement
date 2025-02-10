// src/components/Sidebar/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, House , StretchHorizontal ,LayoutList  } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>WorkManagerment</h1>
      </div>
      <nav className="menu">
        <NavLink to="/" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <Home size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/categories" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <StretchHorizontal   size={20} />
          <span>Danh mục</span>
        </NavLink>

        <NavLink to="/items" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <LayoutList  size={20} />
          <span>Danh sách hạng mục</span>
        </NavLink>

        <NavLink to="/user" className={({ isActive }) =>
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <Users size={20} />
          <span>Quản lý User</span>
        </NavLink>

        <NavLink to="/departments" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <House  size={20} />
          <span>Quản lý Phòng ban</span>
        </NavLink>

        
      </nav>
    </div>
  );
};

export default Sidebar;