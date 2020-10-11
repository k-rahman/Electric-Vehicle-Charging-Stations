import React from 'react';
import { pluralOrSingular } from '../utils/pluralOrSingle';
import styles from '../assets/css/location.module.css';

const server = process.env.REACT_APP_SERVER;

const Location = ({ image, name, address, stationsCount, onStartChargingClick }) => {
  return (
    <div className={`${styles.location} card shadow-lg sticky-top`}>
      <img
        src={`${server}/images/${image}`}
        className={`${styles['location-img']} card-img-top`}
        alt="Location image" />
      <div className={`${styles['location-details']} card-body`}>
        <p
          className={`${styles['location-name']} card-title h6 font-weight-bold`}>{name}</p>
        <p
          className={`${styles['location-address']} card-text text-muted`}>
          <small>{address}</small>
        </p>
        <span
          class={`${styles['stations-count']} badge`}>{stationsCount} station{pluralOrSingular(stationsCount)}
        </span>
      </div>
      <div className={styles['charging-btn-container']}>
        <button
          id="charging-btn"
          name="activate"
          className={`${styles['charging-btn']} btn`}
          onClick={onStartChargingClick}
        >Start Charging</button>
      </div>
    </div>
  );
}

export default Location;