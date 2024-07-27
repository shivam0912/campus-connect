import React from 'react';

function PricePrediction() {
  return (
    <div style={{ width: '100%', margin: '50px' }}>
     
      {/* Embed Flask app using an iframe */}
      <iframe
        src="http://localhost:5001/"
        style={{
          width: '100%',
          height: '800px', // Adjust the height as needed
          border: 'none',
          overflow: 'hidden', // Prevent scrolling
        }}
      ></iframe>
    </div>
  );
}

export default PricePrediction;
