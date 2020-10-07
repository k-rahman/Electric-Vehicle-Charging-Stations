import React from 'react';
import styles from '../../assets/css/popup.module.css';

const MapCard = ({ title, text }) => {
  return (
    <div className={`${styles.card} ${styles['rounded-lg']}`}>
      <div 
        className={`${styles['card-body']}
          ${styles['rounded-lg']}`}>
        <p className={`${styles['card-title']}`}>{title}</p>
        <p className={`${styles['card-text']}`}>{text}</p>
      </div>
    </div>
  );
}

export default MapCard;