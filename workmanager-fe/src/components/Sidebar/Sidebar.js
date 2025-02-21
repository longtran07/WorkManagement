import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  ChevronUp
} from 'lucide-react';
import './Sidebar.css';
import UserPopup from '../Popup/UserPopup/UserPopup';
import { logOut } from '../../services/authenticationService';
import { getUserInfoByUsername } from '../../services/api-service/Profile';

const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false); // Thêm state cho popup
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await getUserInfoByUsername();
      if (response.success) {
        setUser({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          avatarUrl: response.data.avatarUrl,

        });
      } else {
        console.error(response.message);
      }
    };
    fetchUserInfo();
  }, []);

  const handleUserClick = (e) => {
    e.preventDefault();
    setIsUserPopupOpen(!isUserPopupOpen); // Toggle trạng thái popup
  };

  const handlePopupAction = (action) => {
    setIsUserPopupOpen(false); // Đóng popup
    action(); // Thực hiện hành động tương ứng
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.user-info') && !event.target.closest('.user-popup')) {
      setIsUserPopupOpen(false);
    }
  };

  React.useEffect(() => {
    if (isUserPopupOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isUserPopupOpen]);

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
          label: 'Loại công việc',
          path: '/workType'
        },
        {
          icon: <LayoutList size={20} />,
          label: 'Cấu hình chuyển trạng thái',
          path: '/workConfig'
        },
        {
          icon: <Users size={20} />,
          label: 'Quản lý công việc',
          path: '/workOrder'
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
        <h1>WorkManagement</h1>
      </div>
      <nav className="menu">
        {Object.entries(menuStructure).map(([key, item]) =>
          renderMenuItem(item, key)
        )}
      </nav>
      <div
        className="user-info"
      >
        <div
          className="menu-item"
          onClick={handleUserClick}
        >
          {user && <img src={user.avatarUrl} alt="Avatar" className="user-avatar" />}
          {user && <span className="bold-text">{`${user.firstName} ${user.lastName}`}</span>}
        </div>
        {user && (
          <UserPopup
            isOpen={isUserPopupOpen}
            onClose={() => setIsUserPopupOpen(false)}
            onProfile={() => handlePopupAction(() => navigate('/profile'))}
            onChangePassword={() => handlePopupAction(() => navigate('/changePassword'))}
            onLogout={() => handlePopupAction(() => logOut(navigate))}
          />

        )}
      </div>
    </div>
  );
};

export default Sidebar;