import React, { useEffect, useState } from 'react';
import { getOutletsByStationId } from '../services/outletService';
import DelayedRender from './common/DelayedRender ';
import Outlet from './Outlet';
import styles from '../assets/css/station.module.css';

const Station = ({ station, stationNumber }) => {

  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStationOutlets = async () => {
      const { data } = await getOutletsByStationId(station.id);
      setOutlets(data);
    }

    fetchStationOutlets();
  }, [station])


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [])

  const countAvailable = () => {
    let count = 0;
    for (let outlet of outlets)
      if (outlet.status === 'Available')
        count++
    return count > 0 ? count + ' outlet available' : 'All outlets are in use';
  }

  return (
    !loading ?
      <div className={`${styles['station-card']} card shadow-lg`}>
        <div className={`${styles['station-header']} card-header py-1 pl-4`}>
          <div className="row">
            <div className="col">
              <span><strong>Station {stationNumber}</strong></span>
              <div className="mt-n1">
                <small>{station.type} charging</small>
              </div>
            </div>
            <div className={`${styles['available-count']} col-7`}>
              <span className="badge badge-light">
                {countAvailable()}
              </span>
            </div>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          {outlets.map(outlet =>
            <Outlet key={outlet.id} {...outlet} />)}
        </ul>
      </div> : <DelayedRender stationType={station.type}  stationNumber={stationNumber}/>
  );
}

export default Station;