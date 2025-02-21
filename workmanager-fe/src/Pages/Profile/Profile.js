import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css'; // Import the CSS file
import { getUserInfoByUsername, updateUserInfo, getAddressByUserId, updateAddress, addAddress } from '../../services/api-service/Profile';
import { API } from '../../configurations/configuration';
import httpClient from '../../configurations/httpClient';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editing, setEditing] = useState({
    personalInfo: false,
    address: false
  });
  const [avatar, setAvatar] = useState(null);

  const fetchUserInfo = async () => {
    const response = await getUserInfoByUsername();
    if (response.success) {
      setUserInfo({
        userId: response.data.userId,
        username: response.data.username,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber || '',
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
        departmentId: '130', // Hardcoded for example
        avatarUrl: response.data.avatarUrl,
        address: {
          city: '',
          district: '',
          ward: '',
          street: ''
        }
      });

      // Fetch address information
      const addressResponse = await getAddressByUserId(response.data.userId);
      if (addressResponse.success) {
        setUserInfo(prev => ({
          ...prev,
          address: addressResponse.data
        }));
      } else {
        console.error(addressResponse.message);
      }
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setUserInfo(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setUserInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (section) => async (e) => {
    e.preventDefault();

    if (section === 'personalInfo') {
      const response = await updateUserInfo({
        userId: userInfo.userId,
        username: userInfo.username,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phoneNumber: userInfo.phoneNumber,
        departmentId: userInfo.departmentId
      });

      if (response.success) {
        console.log('User info updated successfully');
        setEditing(prev => ({
          ...prev,
          [section]: false
        }));
      } else {
        console.error(response.message);
      }
    } else if (section === 'address') {
      const addressData = {
        username: userInfo.username,
        city: userInfo.address.city,
        district: userInfo.address.district,
        ward: userInfo.address.ward,
        street: userInfo.address.street
      };

      // Check if address already exists
      const existingAddressResponse = await getAddressByUserId(userInfo.userId);
      let response;
      if (existingAddressResponse.success) {
        response = await updateAddress(addressData);
      } else {
        response = await addAddress(addressData);
      }

      if (response.success) {
        console.log('Address updated successfully');
        setEditing(prev => ({
          ...prev,
          [section]: false
        }));
      } else {
        console.error(response.message);
      }
    }
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    if (!avatar) return;

    const formData = new FormData();
    formData.append('file', avatar);

    try {
      const response = await httpClient.post(`${API.USER}/${userInfo.userId}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.message === 'Avatar updated successfully') {
        console.log('Avatar uploaded successfully');
        setUserInfo(prev => ({
          ...prev,
          avatarUrl: response.data.result
        }));
        // Refresh user info
        fetchUserInfo();
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  const handleAvatarDelete = async () => {
    try {
      const response = await httpClient.delete(`${API.USER}/${userInfo.userId}/avatar`);
      if (response.data === 'Avatar deleted successfully') {
        console.log('Avatar deleted successfully');
        setUserInfo(prev => ({
          ...prev,
          avatarUrl: null // or set to a default URL if you have one
        }));
        // Refresh user info
        fetchUserInfo();
      }
    } catch (error) {
      console.error('Error deleting avatar:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title mb-4">HỒ SƠ CỦA TÔI</h1>
          
          <div className="d-flex align-items-center mb-4">
            <div className="avatar-container">
              <img
                src={userInfo.avatarUrl || "/api/placeholder/150/150"}
                alt="Ảnh đại diện"
                className="rounded-circle img-thumbnail mb-3"
              />
              <input type="file" className="file-input" onChange={handleAvatarChange} />
            </div>
            <div className="ms-3">
              <h4>{userInfo.firstName} {userInfo.lastName}</h4>
              <div className="d-flex">
                <button className="btn btn-primary me-2" onClick={handleAvatarUpload}>
                  Chọn ảnh đại diện
                </button>
                <button className="btn  btn-primary" onClick={handleAvatarDelete}>
                  Xóa ảnh đại diện
                </button>
              </div>
            </div>
          </div>

          {/* Thông tin cá nhân */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="card-title">Thông tin cá nhân</h3>
                {!editing.personalInfo && (
                  <button 
                    className="btn btn-link text-decoration-none"
                    onClick={() => setEditing(prev => ({ ...prev, personalInfo: true }))}
                  >
                    ✏️ Sửa
                  </button>
                )}
              </div>

              {editing.personalInfo ? (
                <form onSubmit={handleSubmit('personalInfo')}>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Tên tài khoản</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={userInfo.username}
                        disabled
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Họ</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Tên</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Số điện thoại</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Phòng ban</label>
                      <input
                        type="text"
                        className="form-control"
                        name="departmentId"
                        value={userInfo.departmentId}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Lưu thay đổi
                  </button>
                </form>
              ) : (
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="text-muted d-block">Tên tài khoản</label>
                    <span>{userInfo.username}</span>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="text-muted d-block">Họ</label>
                    <span>{userInfo.lastName}</span>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="text-muted d-block">Tên</label>
                    <span>{userInfo.firstName}</span>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="text-muted d-block">Số điện thoại</label>
                    <span>{userInfo.phoneNumber}</span>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="text-muted d-block">Email</label>
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="text-muted d-block">Phòng ban</label>
                    <span>{userInfo.departmentId}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Địa chỉ liên hệ */}
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="card-title">Địa chỉ liên hệ</h3>
                {!editing.address && (
                  <button 
                    className="btn btn-link text-decoration-none"
                    onClick={() => setEditing(prev => ({ ...prev, address: true }))}
                  >
                    ✏️ Sửa
                  </button>
                )}
              </div>

              {editing.address ? (
                <form onSubmit={handleSubmit('address')}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Tỉnh/Thành phố</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.city"
                        value={userInfo.address.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Quận/Huyện</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.district"
                        value={userInfo.address.district}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phường/Xã</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.ward"
                        value={userInfo.address.ward}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Tên đường, Tòa nhà, Số nhà</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.street"
                        value={userInfo.address.street}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Lưu thay đổi
                  </button>
                </form>
              ) : (
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="text-muted d-block">Tỉnh/Thành phố</label>
                    <span>{userInfo.address.city}</span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-muted d-block">Quận/Huyện</label>
                    <span>{userInfo.address.district}</span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-muted d-block">Phường/Xã</label>
                    <span>{userInfo.address.ward}</span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-muted d-block">Tên đường, Tòa nhà, Số nhà</label>
                    <span>{userInfo.address.street}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;