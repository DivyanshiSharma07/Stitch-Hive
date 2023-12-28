import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/ProfileC.css';
import customerLogo from './styles/B.png';
import { useParams } from 'react-router-dom';

const ProfileC = () => {
  const { email } = useParams();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/profile/customer/${email}`)
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error('Error fetching profile:', error));
  }, [email]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="customer-container">
       <h2 className="customer-heading">Customer Profile</h2> 
       <div className="customer-info"> 
         <div className="customer-avatar"> 
           <img src={customerLogo} alt="Logo" className="logo-image" />
         </div>
         <div className="customer-details"> 
         <p>Name: {profileData.c_fullname} </p>
           <p>Email: {profileData.c_email}</p>
           <p>Contact: {profileData.c_contact}</p>
           <p>Address: {profileData.c_address}</p>
         </div>
       </div>
      
       {/* Feedback Section */}
       <div className="feedback-section">
         <h3>Provide Feedback</h3>
         <p>Have feedback on your recent orders? Click below to provide your valuable feedback.</p>
         <Link to="/feedback" className="feedback-button">Add Feedback</Link>
       </div>

      <div className="Track-section">
        <h3>Track Order</h3>
        <p>Click below to track your order.</p>
        <Link to={`/TrackOrder/${email}`} className="Track-button">Track Order</Link>
      </div>
    </div>
  );
};

export default ProfileC;

