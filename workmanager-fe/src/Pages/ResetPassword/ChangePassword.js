import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import httpClient from '../../configurations/httpClient';
import { API } from '../../configurations/configuration';
import './ChangePassword.css';
import { useNavigate } from 'react-router-dom';

const ChangePassword = ({ userId }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
  };

  const toggleShowPassword = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      setLoading(false);
      return;
    }

    try {
      const response = await httpClient.put(`${API.USER}/${userId}`, {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });

      if (response.data.success) {
        alert('Đổi mật khẩu thành công!');
        navigate('/dashboard');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Đã xảy ra lỗi khi đổi mật khẩu.');
    }

    setLoading(false);
  };

  return (
    <div className="change-password-container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title mb-4">Đổi mật khẩu</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label">Mật khẩu hiện tại</label>
              <div className="input-group">
                <input
                  type={showPasswords.currentPassword ? 'text' : 'password'}
                  className="form-control"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="input-group-text bg-light border-0"
                  onClick={() => toggleShowPassword('currentPassword')}
                >
                  {showPasswords.currentPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
              <div className="input-group">
                <input
                  type={showPasswords.newPassword ? 'text' : 'password'}
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="input-group-text bg-light border-0"
                  onClick={() => toggleShowPassword('newPassword')}
                >
                  {showPasswords.newPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu mới</label>
              <div className="input-group">
                <input
                  type={showPasswords.confirmPassword ? 'text' : 'password'}
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="input-group-text bg-light border-0"
                  onClick={() => toggleShowPassword('confirmPassword')}
                >
                  {showPasswords.confirmPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? 'Đang xử lý...' : 'Lưu'}
              </button>
              <button type="button" className="btn btn-primary" onClick={() => navigate('/profile')}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
