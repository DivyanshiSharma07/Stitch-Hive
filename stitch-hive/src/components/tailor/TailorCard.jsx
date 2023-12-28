// TailorCard.js
import React from 'react';
import './TailorCard.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const TailorCard = function ({ tailor }) {
  return (
    <div className="card-container" style={{ float: 'left' }}>
      <h2 className="title">{tailor.t_fullname}</h2>
      <p className="detail">Location: {tailor.t_location}</p>
      <p className="detail">Experience: {tailor.t_experience} years</p>
      <p className="detail">Services: {tailor.t_specialization}</p>
      <p className="detail">Ratings: {tailor.ratings}</p>
      <p className="detail">Deadline: {tailor.deadline}</p>
      <p className="detail">Contact: {tailor.t_contact}</p>
      <Link to={`/tailor/${tailor.t_email}`}>
        <button className="view-profile-button">View Full Profile</button>
      </Link>
    </div>
  );
};

export default TailorCard;