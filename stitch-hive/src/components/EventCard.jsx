import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="workshop-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Location: {event.location}</p>
      <p>For More details Contact: {event.contact}</p>
    </div>
  );
};

export default EventCard;
