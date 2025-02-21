import React from "react";
import "./UserPopup.css";
import { 
  UserPen, KeyRound,LogOut
  
} from 'lucide-react';

const UserPopup = ({ isOpen, onClose, onProfile, onChangePassword, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="user-popup">
      <ul>
        <li onClick={onProfile}><UserPen /> Hồ sơ của tôi</li>
        <li onClick={onChangePassword}><KeyRound /> Đổi mật khẩu</li>
        <li onClick={onLogout}><LogOut /> Đăng xuất</li>
      </ul>
    </div>
  );
};

export default UserPopup;
