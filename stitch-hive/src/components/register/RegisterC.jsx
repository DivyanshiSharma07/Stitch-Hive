import React, { useState } from 'react';
import './Register.css';

const RegisterC = () => {
  const [formData, setFormData] = useState({
    c_fullname: '',
    c_email: '',
    c_password: '',
    c_address: '',
    c_contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/register/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Customer Registration successful');
        const responseData = await response.json();
        const registeredCustomer = responseData.customer;
  
        localStorage.setItem('customerData', JSON.stringify(registeredCustomer));
  
        window.location.href = '/login/customer';
      } else {
        console.error('Customer Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Customer Registration</h2>
        <input
          type="text"
          placeholder="Full Name"
          name="c_fullname"
          value={formData.c_fullname}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="c_email"
          value={formData.c_email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="c_password"
          value={formData.c_password}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Address"
          name="c_address"
          value={formData.c_address}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Contact Information"
          name="c_contact"
          value={formData.c_contact}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? <a href="/login/customer">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterC;
