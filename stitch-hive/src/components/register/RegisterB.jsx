import React, { useState } from 'react';
import './Register.css';

const RegisterB = () => {
  
  const [formData, setFormData] = useState({
    b_fullname: '',
    b_email: '',
    b_password: '',
    b_boutique_name: '',
    b_location: '',
    b_experience: '',
    b_contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/register/boutique-owner', { // Specify the full URL with port
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Registration successful');
        window.location.href = '/login/boutique-owner';
      } else {
        console.error('Registration failed');
        // Handle registration failure here
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle any other errors here
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Boutique Registration</h2>
        <input
          type="text"
          placeholder="Full Name"
          name="b_fullname"
          value={formData.b_fullname}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="b_email"
          value={formData.b_email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="b_password"
          value={formData.b_password}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Boutique-Name"
          name="b_boutique_name"
          value={formData.b_boutique_name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Location"
          name="b_location"
          value={formData.b_location}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Experience in years"
          name="b_experience"
          value={formData.b_experience}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Contact Information"
          name="b_contact"
          value={formData.b_contact}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? <a href="/login/boutique-owner">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterB;
