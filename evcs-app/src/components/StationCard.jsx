import React, { useEffect, useState } from 'react';
import {getOutletsByStationId} from '../services/outletService';
import HorizontalCard from './common/HorizontalCard';

const StationCard = ({station, stationNumber}) => {

  const [outlets, setOutlets] = useState([]);

  useEffect(() => {
    const fetchOutlets = async () => {
      const {data } = await getOutletsByStationId(station.id);
      setOutlets(data);
    }

    fetchOutlets();
  }, [station])

  const pluralOrSingular = counter => {
    if (counter > 1) return 's';
    return '';
  };

  const countAvailable = () => {
    let count = 0;
    for (let outlet of outlets)
      if (outlet.status === 'Available')
        count++
    return count > 0 ? count + ' outlet available' : 'All outlets are in use';
  }

  return (
    <div className="card shadow-lg mt-1">
      <div className="card-header row">
        <div className='col-7'>Station {stationNumber}
          <br /><small>{station.type} charging</small></div>
      </div>
      <ul className="list-group list-group-flush">
        <li className='list-group-item'>
          <div className='d-flex justify-content-center'>
            <span className="badge">
                {countAvailable()}
            </span>
          </div>
        </li>
        <li className="list-group-item">
          {outlets.map(outlet =>
            <HorizontalCard key={outlet.id} {...outlet} />)}
        </li>
      </ul>
    </div>
  );
}

export default StationCard;