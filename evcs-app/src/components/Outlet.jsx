import React from 'react';
import styles from '../assets/css/outlet.module.css';

const server = process.env.REACT_APP_SERVER;

const Outlet = (props) => {
   const {
      img,
      power,
      code,
      name,
      unit,
      payment,
      status } = props;

   const statusClass = status === 'Available' ?
      `${styles['plug-status-available']}` :
      `${styles['plug-status-busy']}`

   return (
      <li className='list-group-item'>
         <div className="row justify-content-between my-1"> {/*main row*/}
            <div className={`${styles['plug-img-container']} col-3`}> {/*first column*/}
               <img
                  src={`${server}/images/${img}`}
                  className={`${styles['plug-img']} card-img`} alt="Plug Type" />
            </div>
            <div className= 'col-4 p-0'> {/*second column*/}
               <div className="row">
                  <div className={`${styles['plug-prop']} col`}>
                     <span className={styles['plug-type']}>{name}</span><span className={`${styles['plug-power']} badge badge-pill`}>{power} kW</span>
                  </div>
               </div>
               <div className="row">
                  <div className="col p-0">
                     <span className={`${styles['plug-price']}`}>{payment} € /{unit}</span>
                  </div>
               </div>
            </div>
            <div className='col-4'>{/*third column*/}
               <div className='row p-1'>
                  <div className={`${styles['plug-status']} col-12`}>
                     <span className={`${statusClass} badge`}>{status}</span>
                  </div>
               </div>
               <div className="row">
                  <div className="col-12">
                     <span className={`${styles['plug-code']}`}>Code {code}</span>
                  </div>
               </div>
            </div>
         </div>
      </li >
   );
};

export default Outlet;