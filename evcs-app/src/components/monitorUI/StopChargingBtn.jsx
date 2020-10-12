import React from 'react';
import styles from '../../assets/css/monitor.module.css';

const StopChargingBtn = ({isRunning, onStopClick}) => {
  return ( 
      <div className={`${styles.stop} row ml-2`}>
        <div className="col-9">
          <span >You can cancel the charging sequence by pressing the stop button.</span>
        </div>
        <div className="col">
          <button
            className={`${styles['stop-btn']} btn`}
            onClick={onStopClick}>{isRunning}Stop charging</button>
        </div>
      </div>
   );
}
 
export default StopChargingBtn;