import React, { useState } from 'react';
import './Login.css';

const LoginA = () => {
  const [formData, setFormData] = useState({
    b_email: '',
    b_password: '',
  });

  const [loginMessage, setLoginMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    // Check if the email and password match the admin credentials
    if (formData.b_email === 'divyanshi@gmail.com' && formData.b_password === '2023') {
      setLoginMessage('Login successful');
      console.log('Admin login successful');
      // Redirect to the admin profile page
      window.location.href = '/profile/admin';
    } else {
      setLoginMessage('Login failed');
      // Handle login failure here
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleAdminLogin}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          name="b_email"
          value={formData.b_email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="b_password"
          value={formData.b_password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p>{loginMessage}</p>
      </form>
    </div>
  );
};

export default LoginA;
