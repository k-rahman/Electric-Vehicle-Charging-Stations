import React from 'react';
import styles from '../../assets/css/monitor.module.css';

const Confirmation = ({onYesClick, onNoClick}) => {
  return ( 
        <>
          <div className={`${styles.confirm} row ml-2`}>
            <div className="col-12">Are you sure you want to stop charging?</div>
          </div>
          <div className="row text-left ml-2">
            <div className='col-3'>
              <button className={`${styles['yes-btn']} btn`} onClick={onYesClick}>Yes</button>
            </div>
            <div className='col-3'>
              <button className={`${styles['no-btn']} btn`} onClick={onNoClick}>No</button>
            </div>
          </div>
        </>
   );
}
 
export default Confirmation;