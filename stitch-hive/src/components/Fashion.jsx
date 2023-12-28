// Fashion.jsx
import React, { useState, useEffect } from 'react';
import './styles/Fashion.css';
import bg from './styles/bg.png'; 
import EventCard from './EventCard'; // Import the EventCard component

const workshops = [
    {
      title: 'Boutique Management Workshop',
      description: 'Learn the essentials of running a boutique.',
      date: 'Date: July 15, 2023',
      time: 'Time: 2:00 PM - 4:00 PM',
      location: 'Location: Virtual Event',
      contact: 'For More details Contact: 7896457284'
    },
    {
      title: 'Advanced Tailoring Techniques',
      description: 'Master advanced tailoring skills.',
      date: 'Date: August 5, 2023',
      time: 'Time: 3:30 PM - 5:30 PM',
      location: 'Location: Fashion Studio',
      contact: 'For More details Contact: 7896457284'
    },
    {
      title: 'Stylish Dressmaking Class',
      description: 'Create stylish dresses from scratch.',
      date: 'Date: September 10, 2023',
      time: 'Time: 10:00 AM - 12:00 PM',
      location: 'Location: Local Community Center',
      contact: 'For More details Contact: 7896457284'
    },
    {
      title: 'Embroidery and Beading Workshop',
      description: 'Enhance your stitching with embroidery and beading.',
      date: 'Date: October 7, 2023',
      time: 'Time: 2:00 PM - 4:00 PM',
      location: 'Location: Sewing School',
      contact: 'For More details Contact: 7896457284'
    },
    {
      title: 'Fashion Design Basics',
      description: 'Learn the fundamentals of fashion design.',
      date: 'Date: November 12, 2023',
      time: 'Time: 3:00 PM - 5:00 PM',
      location: 'Location: Boutique Classroom',
      contact: 'For More details Contact: 7896457284'
    },
    {
      title: 'Tailoring for Beginners',
      description: 'Start your journey into the world of tailoring.',
      date: 'Date: December 3, 2023',
      time: 'Time: 1:00 PM - 3:00 PM',
      location: 'Location: Sewing Workshop',
      contact: 'For More details Contact: 7896457284'
    },
    {
      title: 'Sewing Techniques for Couture',
      description: 'Master sewing techniques for couture fashion.',
      date: 'Date: January 15, 2024',
      time: 'Time: 10:00 AM - 12:00 PM',
      location: 'Location: Fashion Studio',
      contact: 'For More details Contact: 7896457284'

    },
    {
      title: 'Pattern Making Workshop',
      description: 'Learn to create patterns for clothing.',
      date: 'Date: February 5, 2024',
      time: 'Time: 2:00 PM - 4:00 PM',
      location: 'Location: Local Community Center',
      price: 'Price: $25',
      contact: 'For More details Contact: 7896457284'

    },
    {
      title: 'Bridal Dress Design Masterclass',
      description: 'Design stunning bridal dresses.',
      date: 'Date: March 10, 2024',
      time: 'Time: 3:30 PM - 5:30 PM',
      location: 'Location: Boutique Classroom',
      contact: 'For More details Contact: 7896457284'

    },
    {
      title: 'Fashion Stitching Techniques',
      description: 'Explore advanced stitching techniques for fashion.',
      date: 'Date: April 7, 2024',
      time: 'Time: 10:00 AM - 12:00 PM',
      location: 'Location: Sewing School',
      contact: 'For More details Contact: 7896457284'

    },
  ];
  

const Fashion = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch event data from the server
    fetch('http://localhost:4000/events')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);
  return (
    <div className="fashion-container">
      <h2 className="fashion-heading">Workshops</h2>
      <div className="workshop-list">
        {workshops.map((workshop, index) => (
          <div key={index} className="workshop-card">
            <h3>{workshop.title}</h3>
            <p>{workshop.description}</p>
            <p>{workshop.date}</p>
            <p>{workshop.time}</p>
            <p>{workshop.location}</p>
            <p>{workshop.contact}</p>
          </div>
        ))}
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Fashion;
