import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  House, 
  StretchHorizontal, 
  LayoutList,
  ChevronDown,
  ChevronRight,
  Package,
  Briefcase,
  User
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const menuStructure = {
    dashboard: {
      type: 'single',
      icon: <Home size={20} />,
      label: 'Dashboard',
      path: '/dashboard'
    },
    common: {
      type: 'group',
      icon: <Package size={20} />,
      label: 'Common',
      items: [
        { 
          icon: <StretchHorizontal size={20} />,
          label: 'Danh mục',
          path: '/categories'
        },
        {
          icon: <LayoutList size={20} />,
          label: 'Danh sách hạng mục',
          path: '/items'
        },
        {
          icon: <Users size={20} />,
          label: 'Quản lý User',
          path: '/user'
        },
        {
          icon: <House size={20} />,
          label: 'Quản lý Phòng ban',
          path: '/departments'
        }
      ]
    },
    work: {
      type: 'group',
      icon: <Briefcase size={20} />,
      label: 'Work',
      items: [
        {
          icon: <LayoutList size={20} />,
          label: 'WO Priority',
          path: '/wo-priority'
        },
        {
          icon: <LayoutList size={20} />,
          label: 'WO Status',
          path: '/wo-status'
        },
        {
          icon: <Users size={20} />,
          label: 'Roles',
          path: '/roles'
        }
      ]
    }
  };

  const toggleExpand = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderMenuItem = (item, key) => {
    if (item.type === 'single') {
      return (
        <NavLink
          key={key}
          to={item.path}
          className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      );
    }

    return (
      <div key={key} className="menu-group">
        <button
          onClick={() => toggleExpand(key)}
          className="menu-item menu-group-header"
        >
          {item.icon}
          <span>{item.label}</span>
          {expandedItems[key] ? 
            <ChevronDown size={16} /> : 
            <ChevronRight size={16} />
          }
        </button>
        
        {expandedItems[key] && (
          <div className="submenu">
            {item.items.map((subItem, index) => (
              <NavLink
                key={index}
                to={subItem.path}
                className={({ isActive }) => 
                  `menu-item submenu-item ${isActive ? 'active' : ''}`
                }
              >
                {subItem.icon}
                <span>{subItem.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h1>WorkManagerment</h1>
      </div>
      <nav className="menu">
        {Object.entries(menuStructure).map(([key, item]) => 
          renderMenuItem(item, key)
        )}
      </nav>
      <div className="user-info">
        <NavLink
          to="/user-info"
          className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
        >
          <User size={20} />
          <span>Người dùng</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;