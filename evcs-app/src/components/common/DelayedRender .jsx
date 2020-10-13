import React from 'react';
import styles from '../../assets/css/station.module.css';

const DelayedRender = (props) => {
  return ( 
      <div className={`${styles['station-card']} card shadow-lg`}>
        <div className={`${styles['station-header']} card-header py-1 pl-4`}>
          <div className="row">
            <div className="col">
              <span><strong>Station {props.stationNumber}</strong></span>
              <div className="mt-n1">
                <small>{props.stationType} charging</small>
              </div>
            </div>
            <div className={`${styles['available-count']} col-7`}>
            </div>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className='list-group-item text-center'>
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </li>
        </ul>
      </div>
   );
}
 
export default DelayedRender;