import React  from 'react';
import './styles/IntroDetail.css';
import page1 from './images/women.png';

const IntroDetail = () => {

  return (
    <section className="detail-section">
      <div className="detail-content">
        <h2 className="detail-heading">Elevating Fashion, Tailored for You</h2>
        <div className="detail-wrapper">
          <div className="detail-image">
            <img src={page1} alt="Logo" className="h-8" />
          </div>
          <div className="detail-text">
            <p>
            Our platform redefines the way you tailor your fashion journey, bridging the gap between seekers and creators. Whether you're seeking bespoke elegance or trendsetting innovations, our comprehensive network ensures you discover the perfect fit for your unique style. With intuitive search filters and intelligent curation, you can effortlessly explore options that match your preferences. Save time and enhance your fashion experience by tapping into our vibrant community of talented artisans and boutiques, ready to elevate your style journey. Embrace limitless possibilities in your pursuit of sartorial excellence with our empowering fashion ecosystem.            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroDetail;
