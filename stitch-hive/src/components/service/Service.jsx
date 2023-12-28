import React, { useState } from 'react';
import './Service.css';

const Service = () => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  return (
    <section className="features-section">
      <h2 className="features-heading">Services :</h2>
      <div className="features-table">
        <div className="features-row">
          <div className={`features-container ${clickedIndex === 1 ? 'clicked' : ''}`} onClick={() => handleClick(1)}>
            <div className="features-content">
              <h3>Customer Clothing Creation</h3>
              <p>Tailors can create custom clothing items from scratch based on the customer's design preferences, measurements, and fabric choices.</p>
            </div>
          </div>
          <div className={`features-container ${clickedIndex === 2 ? 'clicked' : ''}`} onClick={() => handleClick(2)}>
            <div className="features-content">
              <h3>Alterations and Repairs</h3>
              <p>Tailors can provide alteration and repair services for clothing that doesn't fit perfectly or has minor damages</p>
            </div>
          </div>
          <div className={`features-container ${clickedIndex === 3 ? 'clicked' : ''}`} onClick={() => handleClick(3)}>
            <div className="features-content">
              <h3>Tailoring for Special Occasions</h3>
              <p>Tailors can specialize in creating clothing for special occasions like weddings, parties, and formal events</p>
            </div>
          </div>
        </div>
        <div className="features-row">
          <div className={`features-container ${clickedIndex === 4 ? 'clicked' : ''}`} onClick={() => handleClick(4)}>
            <div className="features-content">
              <h3>Dressmaking</h3>
              <p>Tailors can create custom dresses for women, ranging from casual dresses to formal evening gowns</p>
            </div>
          </div>
          <div className={`features-container ${clickedIndex === 5 ? 'clicked' : ''}`} onClick={() => handleClick(5)}>
            <div className="features-content">
              <h3>Embroidery and Embellishments</h3>
              <p>Tailors can offer embroidery and embellishment services to add intricate designs and details to clothing</p>
            </div>
          </div>
          <div className={`features-container ${clickedIndex === 6 ? 'clicked' : ''}`} onClick={() => handleClick(6)}>
            <div className="features-content">
              <h3>Consultations and Styling</h3>
              <p>Tailors can provide styling advice and consultations to help customers choose the right fabrics, designs, and clothing items that suit their body type and style preferences.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
