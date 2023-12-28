import React, { useState, useEffect } from 'react';
import './styles/Feedback.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [previousFeedback, setPreviousFeedback] = useState([]);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedbackData = {
      ratings: rating,
      comments: feedback,
      order_id: orderNumber,
      customerEmail: customerEmail,
    };

    fetch('http://localhost:4000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Feedback submitted:', data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:4000/feedback/by-customer/${customerEmail}`)
      .then((response) => response.json())
      .then((data) => {
        setPreviousFeedback(data);
      })
      .catch((error) => {
        console.error('Error fetching previous feedback:', error);
      });
  }, [customerEmail]);

  return (
    <div className="feedback-container">
      <h2 className="feedback-heading">Feedback</h2>
      {submitted ? (
        <div className="feedback-thankyou">
          Thank you for your feedback and rating!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            className="order-number-input"
            placeholder="Order Number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
          />
          <input
            type="email"
            className="customer-email-input"
            placeholder="Your Email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
          <textarea
            className="feedback-input"
            rows="4"
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <div className="rating-container">
            <p className="rating-label">Rate us:</p>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? 'selected' : ''}`}
                  onClick={() => handleRatingClick(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <button type="submit" className="feedback-submit">
            Submit
          </button>
        </form>
      )}

      <div className="previous-feedback-section">
        <h3>Previous Feedback</h3>
        <ul>
          {previousFeedback.map((feedbackItem) => (
            <li key={feedbackItem.feedback_id}>
              <p>Order Number: {feedbackItem.order_id}</p>
              <p>Feedback: {feedbackItem.comments}</p>
              <p>Rating: {feedbackItem.ratings}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Feedback;
