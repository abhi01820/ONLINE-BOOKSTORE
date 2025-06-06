import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Greeting.css';

const Greeting = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/all-books');
  };

  return (
    <div className="greeting-container">
      <div className="greeting-card">
        <div className="greeting-text">
          <h1 className="headline">🎉 Order Placed Successfully!</h1>
          <p className="subtext">
            Thank you for your purchase! <br />
            We're already preparing your package. <br />
            You'll receive tracking details shortly.
          </p>
          <button className="action-button" onClick={handleContinue}>
            Continue Shopping
          </button>
        </div>
        <div className="greeting-image">
          <img
            src="/img.gif" // or use the uploaded image path
            alt="Celebration"
            className="celebration-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Greeting;
