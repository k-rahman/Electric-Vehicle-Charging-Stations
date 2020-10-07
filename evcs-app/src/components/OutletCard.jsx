import React, {useEffect} from 'react';
import HorizontalCard from './common/HorizontalCard';

const OutletCard = ({outlet}) => {
  const {img, status, power, name, payment, unit} = outlet;

  return ( 
    <HorizontalCard 
      {...outlet}/>
   );
}
 
export default OutletCard;