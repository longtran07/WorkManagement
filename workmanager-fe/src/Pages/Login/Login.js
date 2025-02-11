import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logIn } from '../../services/authenticationService';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await logIn(credentials.username, credentials.password);
      // Xử lý sau khi đăng nhập thành công
      // Ví dụ: chuyển hướng người dùng đến trang chính
      console.log('Đăng nhập thành công:', response);
      window.location.href = '/dashboard'; // hoặc sử dụng navigate từ react-router-dom
    } catch (error) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra khi đăng nhập');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 bg-light">
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              {/* Header */}
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary rounded p-2 me-2">
                  <i className="bi bi-building text-white"></i>
                </div>
                <h3 className="mb-0">Đăng nhập</h3>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Nhập tên đăng nhập"
                    value={credentials.username}
                    onChange={(e) => setCredentials({
                      ...credentials,
                      username: e.target.value
                    })}
                    disabled={loading}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    value={credentials.password}
                    onChange={(e) => setCredentials({
                      ...credentials,
                      password: e.target.value
                    })}
                    disabled={loading}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Đang đăng nhập...
                      </span>
                    ) : (
                      'Đăng nhập'
                    )}
                  </button>
                </div>

                <div className="text-center mt-3">
                  <a href="#" className="text-decoration-none">
                    Quên mật khẩu?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;