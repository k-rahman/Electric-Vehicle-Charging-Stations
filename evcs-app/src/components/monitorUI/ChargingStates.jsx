import React from 'react';
import styles from '../../assets/css/monitor.module.css';

const ChargingStates = ({time, energy, cost}) => {
  const { hrs, mins, secs } = time;

  const addZero = (width, time) => {
    if (time.toString().length === width) {
      return time;
    }

    return '0' + time;
  }

  return (
    <div className="row mt-3">
      <div className='row col-6 pl-4'>
        <div className={`${styles['time-title']} col-12`}>Time elapsed (hh:mm:ss)</div>
        <div className='w-100'></div>
        <div className={`${styles.time} col-12`}>
          <span>{addZero(2, hrs)} : </span>
          <span>{addZero(2, mins)} : </span>
          <span>{addZero(2, secs)}</span>
        </div>
      </div>
      <div className='row col-3 text-center'>
        <div className={`${styles.titles} col-12`}>Energy (kWh)</div>
        <div className="w-100"></div>
        <div className={`${styles.numbers} col-12`}>
          {energy.toFixed(2)}
        </div>
      </div>
      <div className='row col-4 text-right'>
        <div className={`${styles.titles} col-6`}>Cost</div>
        <div className="w-100"></div>
        <div className={`${styles.numbers} col-12`}>
          {cost.toFixed(2)} €
              </div>
      </div>
    </div>
  );
}

export default ChargingStates;