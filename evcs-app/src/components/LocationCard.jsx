import React from 'react';

const server = process.env.REACT_APP_SERVER;

const LocationCard = ({ image, name, address }) => {
  return (
    <div className="card shadow-lg">
      <img
        src={`${server}/images/${image}`}
        className="card-img-top"
        alt="Station details" />
      <div className="card-body">
        <div className='py-3 px-2'>
          <p className="card-title h5 font-weight-bold">{name}</p>
          <p className="card-text text-muted">{address}</p>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;