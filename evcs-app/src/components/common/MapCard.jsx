import React from 'react';

const MapCard = ({ title, text, subText }) => {
  return (
    <div className='card rounded-lg'>
      <div className="card-body rounded-lg">
        <p className="card-title">{title}</p>
        <p className="card-text">{text}</p>
        <p className="card-text"><small className="text-muted">{subText}</small></p>
      </div>
    </div>
  );
}

export default MapCard;