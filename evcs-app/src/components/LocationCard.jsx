import React from 'react';
import styles from '../assets/css/LocationCard.module.css';

const server = process.env.REACT_APP_SERVER;

const LocationCard = ({ image, name, address }) => {
  return (
    <div className={`shadow-lg ${styles.card}`}>
      <img
        src={`${server}/images/${image}`}
        className={styles['card-img-top']}
        alt="Station details" />
      <div className={`${styles['card-body']}`}>
        <div className='py-3 px-2'>
          <p className={`${styles['card-title']} h5 font-weight-bold`}>{name}</p>
          <p className={`${styles['card-text']} text-muted`}>{address}</p>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;