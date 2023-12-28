

import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';


const LoginT = () => {
  const [formData, setFormData] = useState({
    t_email: '',
    t_password: '',
  });

  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login/tailor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setLoginMessage('Login successful');
        console.log('Login successful');
        navigate(`/profile/tailor/${formData.t_email}`);
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
        <h2>Tailor Login</h2>
        <input
          type="email"
          placeholder="Email"
          name="t_email"
          value={formData.t_email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="t_password"
          value={formData.t_password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p>{loginMessage}</p>
        <p>Don't have an account? <a href="/register/tailor">Register</a></p>
      </form>
    </div>
  );
};

export default LoginT;