import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logIn } from '../../services/authenticationService';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const response = await logIn(credentials.username, credentials.password);
    
    if (response.success) {
      console.log("Đăng nhập thành công!", response.data);
      navigate("/dashboard");
    } else {
      alert(response.message);  // Hiển thị thông báo lỗi
    }
  
    setLoading(false);
  };

  return (
    <div className="container-fluid min-vh-100">
      <div className="row min-vh-100">
        {/* Left side với background và waves */}
        <div className="col-md-5 d-none d-md-block position-relative custom-bg">
          <div className="position-relative h-100 d-flex flex-column justify-content-center p-5">
            <h2 className="text-purple mb-4">Chào mừng bạn</h2>
            <button className="btn btn-outline-purple rounded-pill px-4 py-2 border-2 custom-register-btn"
            onClick={()=> navigate('/register')}
            >
              
              Đăng Ký
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
              <h1 className="h3 mb-3 text-purple">ĐĂNG NHẬP TÀI KHOẢN CỦA BẠN</h1>
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
                    placeholder="Email/Tên tài khoản/Số điện thoại"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
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

              <div className="text-end mb-4">
                <a href="#" className="text-decoration-none text-purple">
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn w-100 py-2 rounded-pill custom-login-btn"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang xử lý...
                  </>
                ) : (
                  'Đăng nhập'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
