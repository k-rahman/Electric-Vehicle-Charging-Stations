import React from 'react';

const server = process.env.REACT_APP_SERVER;

const HorizontalCard = props => {
   const { 
      image, 
      power, 
      type, 
      name, 
      unit, 
      payment, 
      status} = props;

   return (
      <div
         className="card mb-3"
         style={{ maxWidth: 540, cursor: "pointer" }}>
         <div className="row no-gutters">
            <div className="col-md-4">
               <img src={`${server}/images/${image}`}
                  className="card-img" alt="" />
            </div>
            <div className="col-md-8" >
               <div className="card-body">
                  <h6 className="card-title mb-0">{name} <br/><small>{power} {status}</small></h6>
                  <p className="card-text mt-0">
                     <small className="text-muted" >{payment} euro/{unit}</small></p>
                  <p className="card-text">{type}</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HorizontalCard;