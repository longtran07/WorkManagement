import React, { useEffect, useState } from 'react';

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>User Information</h2>
      <ul>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
        <li>Phone: {user.phone}</li>
        {/* Add other user details here */}
      </ul>
    </div>
  );
};

export default UserInfo;