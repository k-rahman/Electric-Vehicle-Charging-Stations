import React, {useEffect} from 'react';
import HorizontalCard from './common/HorizontalCard';

const OutletCard = ({outlet}) => {
  const {img, status, power, name, payment, unit} = outlet;

  useEffect(() => {
    checkOutletStatus(status);
  }, []);

  const checkOutletStatus = status => {
    if (status === 'Available')
      return 1;
    if (status === null)
      return 'Out Of Service';
  }

  return ( 
    <HorizontalCard 
      {...outlet}/>
   );
}
 
export default OutletCard;