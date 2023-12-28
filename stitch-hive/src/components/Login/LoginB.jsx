import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const LoginB = () => {
  const [formData, setFormData] = useState({
    b_email: '',
    b_password: '',
  });

  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.  target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login/boutique-owner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setLoginMessage('Login successful');
        console.log('Login successful');
        navigate(`/profile/boutique-owner/${formData.b_email}`);
      }else {
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
        <h2>Boutique Login</h2>
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
        <p>
          Don't have an account? <a href="/register/boutique-owner">Register</a>
        </p>
      </form>
    </div>
  );
};

export default LoginB;