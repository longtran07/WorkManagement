import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { register } from '../../services/authenticationService'; // Giả sử bạn có service này
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(''); // Trạng thái để lưu lỗi mật khẩu
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (credentials.password !== credentials.confirmPassword) {
      setPasswordError('Mật khẩu và Xác nhận mật khẩu không khớp!');
      return;
    }

    setLoading(true);
    setPasswordError(''); // Xóa lỗi nếu có
    try {
      const response = await register({
        username: credentials.username,
        password: credentials.password,
        email: credentials.email,
        phoneNumber: credentials.phoneNumber
      });
      
      if (response.success) {
        console.log("Đăng ký thành công!", response.data);
        navigate("/dashboard");
      } else {
        alert(response.message);  // Hiển thị thông báo lỗi
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi đăng ký:", error);
      alert("Có lỗi xảy ra khi đăng ký.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100">
      <div className="row min-vh-100">
        {/* Left side với background và waves */}
        <div className="col-md-5 d-none d-md-block position-relative custom-bg">
          <div className="position-relative h-100 d-flex flex-column justify-content-center p-5">
            <h2 className="text-purple mb-4">Chào mừng người dùng mới</h2>
            <button
              className="btn btn-outline-purple rounded-pill px-4 py-2 border-2 custom-login-btn"
              onClick={() => navigate('/login')}
            >
              Đăng Nhập
            </button>
            <div className="position-absolute bottom-0 start-0 w-100">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="custom-svg">
                <path 
                  d="M0,0 C30,40 70,40 100,0 L100,100 L0,100 Z" 
                  className="custom-path"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side với form */}
        <div className="col-12 col-md-7 d-flex align-items-center">
          <div className="w-100 max-w-md mx-auto px-4">
            <div className="text-center mb-5">
              <h1 className="h3 mb-3 text-purple">TẠO TÀI KHOẢN MỚI</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-0 py-2"
                    placeholder="Tên tài khoản"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control bg-light border-0 py-2"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="bi bi-phone"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-0 py-2"
                    placeholder="Số điện thoại"
                    value={credentials.phoneNumber}
                    onChange={(e) => setCredentials({ ...credentials, phoneNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control bg-light border-0 py-2"
                    placeholder="Mật khẩu"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-light border-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control bg-light border-0 py-2"
                    placeholder="Xác nhận mật khẩu"
                    value={credentials.confirmPassword}
                    onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              {/* Hiển thị lỗi nếu có */}
              {passwordError && (
                <div className="alert alert-danger" role="alert">
                  {passwordError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn w-100 py-2 rounded-pill custom-register-btn"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang xử lý...
                  </>
                ) : (
                  'Đăng ký'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
