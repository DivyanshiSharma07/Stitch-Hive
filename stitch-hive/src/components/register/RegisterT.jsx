import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom'; // Import Link

const RegisterT = () => {
  const [formData, setFormData] = useState({
    t_fullname: '',
    t_email: '',
    t_password: '',
    t_location: '',
    t_experience: '',
    t_contact: '',
    t_specialization: '',
    t_services: [], // Store selected services as an array
  });

  const [services, setServices] = useState({
    alteration: false,
    tailoring: false,
    customClothing: false,
    styling: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setServices((prevServices) => ({
      ...prevServices,
      [name]: checked,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert the services object into an array of selected services
    const selectedServices = Object.keys(services).filter((service) => services[service]);

    // Add the selected services to the form data
    setFormData({ ...formData, t_services: selectedServices });

    try {
      const response = await fetch('http://localhost:4000/register/tailor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Tailor Registration successful');
        
        // Store the registered tailor's data in local storage
        localStorage.setItem('tailorData', JSON.stringify(responseData.tailor));
        
        window.location.href = '/login/tailor';
      } else {
        console.error('Tailor Registration failed');
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
        <h2>Tailor Registration</h2>
        <input
          type="text"
          placeholder="Full Name"
          name="t_fullname"
          value={formData.t_fullname}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="t_email"
          value={formData.t_email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="t_password"
          value={formData.t_password}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Location"
          name="t_location"
          value={formData.t_location}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Experience in years"
          name="t_experience"
          value={formData.t_experience}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Contact Information"
          name="t_contact"
          value={formData.t_contact}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Specialization"
          name="t_specialization"
          value={formData.t_specialization}
          onChange={handleChange}
        />

        {/* Group of checkboxes for services */}
        <div className="service-group">
          <h3>Services Provided</h3>
          <div className="service-checkboxes">
            <label>
              <input
                type="checkbox"
                name="alteration"
                checked={services.alteration}
                onChange={handleCheckboxChange}
              />
              Alteration
            </label>
            <label>
              <input
                type="checkbox"
                name="tailoring"
                checked={services.tailoring}
                onChange={handleCheckboxChange}
              />
              Tailoring
            </label>
            <label>
              <input
                type="checkbox"
                name="customClothing"
                checked={services.customClothing}
                onChange={handleCheckboxChange}
              />
              Custom Clothing
            </label>
            <label>
              <input
                type="checkbox"
                name="styling"
                checked={services.styling}
                onChange={handleCheckboxChange}
              />
              Styling
            </label>
          </div>
        </div>

        
          <button type="submit">Register</button>
        
        <p>
          Already have an account? <a href="/login/tailor">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterT;
