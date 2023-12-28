

import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';


const LoginC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    c_email: '',
    c_password: '',
  });

  const [loginMessage, setLoginMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setLoginMessage('Login successful');
        console.log('Login successful');
        navigate(`/profile/customer/${formData.c_email}`);
      } else {
        setLoginMessage('Login failed');
        // Handle login failure here
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginMessage('Login failed');
      // Handle any other errors here
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Customer Login</h2>
        <input
          type="email"
          placeholder="Email"
          name="c_email"
          value={formData.c_email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="c_password"
          value={formData.c_password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p>{loginMessage}</p>
        <p>Don't have an account? <a href="/register/customer">Register</a></p>
      </form>
    </div>
  );
};

export default LoginC;
