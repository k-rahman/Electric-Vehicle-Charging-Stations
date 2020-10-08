import React, { useEffect } from 'react';
import OutletCard from './OutletCard';
import styles from '../assets/css/station.module.css';

const StationCard = (props) => {
  const {
    station,
    stationNumber,
    outlets,
    status,
    checkStatus,
    onChargingClick
  }=props;
  const { code, type } = station;

  useEffect(() => {
    checkStatus(outlets);
    console.log('Station send to get outlet status');
  }, []);

  const pluralOrSingular = counter => {
    if (counter > 1) return 's';
    return '';
  };

  return (
    <div className={`${styles.card} card shadow-lg`}>
      <div className={`${styles['card-header']} row`}>
        <div className='col-7'>Station {stationNumber}
          <br/><small>{type} charging</small></div>
          <div className='col-5 text-center'>Station Code <br/><strong>{code}</strong>
          </div>
      </div>
      
      <ul className="list-group list-group-flush">
        <li className='list-group-item'>
<div className='d-flex justify-content-center'>
        <span className={`${styles.badge}`}>
          {status} outlet{pluralOrSingular(status)} available
        </span>

      </div>
</li>
        <li className="list-group-item">
          {outlets.map(outlet =>
            <OutletCard key={outlet.id} outlet={outlet} />)}
          <div className='d-flex justify-content-between px-2 py-3'>
            <p className={styles['card-text']}>
            </p>
            <div>
              <button
                id="charging-btn"
                name="activate"
                disabled={status > 1 ? true : false}
                className={`${styles['charging-btn']} btn`}
                onClick={onChargingClick}
                >Start charging</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default StationCard;