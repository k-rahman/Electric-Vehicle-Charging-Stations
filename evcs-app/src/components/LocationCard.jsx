import React from 'react';
import styles from '../assets/css/locationCard.module.css';

const server = process.env.REACT_APP_SERVER;

const LocationCard = ({ image, name, address, onStartChargingClick }) => {
  return (
    <div className="card shadow-lg sticky-top">
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
          <div className='d-flex justify-content-between px-2 py-3'>
            <div>
              <button
                id="charging-btn"
                name="activate"
                className={`${styles['charging-btn']} btn`}
                onClick={onStartChargingClick}
              >Start Charging</button>
            </div>
          </div>
    </div>
  );
}

export default LocationCard;