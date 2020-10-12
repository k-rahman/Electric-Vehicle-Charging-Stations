import React, { useEffect } from 'react';
import Outlet from './Outlet';
import styles from '../assets/css/station.module.css';

const Station = ({ station, stationNumber, outlets, getOutlets }) => {

  useEffect(() => {
    getOutlets(station.id);
  }, [station])

  const countAvailable = () => {
    let count = 0;
    for (let outlet of outlets)
      if (outlet.status === 'Available')
        count++
    return count > 0 ? count + ' outlet available' : 'All outlets are in use';
  }

  return (
    <div className={`${styles['station-card']} card shadow-lg`}>
      <div className={`${styles['station-header']} card-header py-1 pl-4`}>
        <div className="row">
          <div className="col">
            <span>Station {stationNumber}</span>
          </div>
          <div className={`${styles['available-count']} col-7`}>
            <span className="">
              {countAvailable()}
            </span>
          </div>
        </div>
        <div className="row">
          <div className= 'col'>
            <small>{station.type} charging</small>
          </div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {outlets.map(outlet =>
          <Outlet key={outlet.id} {...outlet} />)}
      </ul>
    </div>
  );
}

export default Station;