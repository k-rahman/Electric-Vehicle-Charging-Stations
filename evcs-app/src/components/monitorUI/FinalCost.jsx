import React from 'react';
import styles from '../../assets/css/monitor.module.css';

const FinalCost = ({cost, onMonitorClose}) => {
  return ( 
      <>
        <div className='row text-center'>
          <div className={`${styles.titles} col-12`}>Your charging session cost</div>
          <div className="w-100"></div>
          <div className={`${styles.numbers} col-12`}>
            {cost.toFixed(2)} €
              </div>
        </div>
        <div className="row text-center mt-4">
          <div className='col-12'>
            <button
              name='closeMonitor'
              className={`${styles['close-btn']} btn`}
              onClick={onMonitorClose}>Close</button>
          </div>
        </div>
        <div className="row text-center mt-1">
          <small className="col-12">Thank you for using our service. Remember to stay green!</small>
        </div>
      </>
   );
}
 
export default FinalCost;