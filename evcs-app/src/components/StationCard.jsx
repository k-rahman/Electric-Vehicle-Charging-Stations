import React, { useEffect, useState } from 'react';
import { getOutletsByStationId } from './../services/ouletService';
import OutletCard from './OutletCard';
import styles from '../assets/css/station.module.css';

const StationCard = ({ station, stationNumber, checkOutletStatus, available, outOfService, outlets }) => {
  const { code, type } = station;
  // const [available, setAvailable] = useState(0);
  // const [outlets, setOutLets] = useState([]);

  // useEffect(() => {
  //   const fetchOutlets = async () => {
  //     const { data } = await getOutletsByStationId(station.id);
  //     const availableArr = data.filter(outlet => outlet.status === "Available");
  //     setAvailable(availableArr.length)
  //     setOutLets(data);
  //   }
  //   fetchOutlets();
  // }, []);

  useEffect(() => {
    checkOutletStatus(outlets);
    console.log('Station send to get outlet status');
  }, []);

  const pluralOrSingular = counter => {
    if (counter > 1) return 's';
    return '';
  }

  

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
          {available} outlet{pluralOrSingular(available)} available
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
                disabled={available > 1 ? true : false}
                className={`${styles['charging-btn']} btn`}>Start charging</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default StationCard;