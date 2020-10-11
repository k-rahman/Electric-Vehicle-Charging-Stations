import React, { useEffect } from 'react';
import Pane from 'react-sliding-pane';
import LocationCard from './LocationCard';
import StationCard from './StationCard';
import "react-sliding-pane/dist/react-sliding-pane.css";

const SlidingPane = (props) => {

  const {
    selectedLocation,
    stations,
    match,
    onLocationSelect,
    onStartChargingClick,
  } = props;

  useEffect(() => {
    onLocationSelect(match.params.id);
  }, [match.params.id]);

  return (
    selectedLocation &&
    <Pane
      isOpen={true}
      className='sliding-pane-content'
      overlayClassName='sliding-pane-overlay'
      onRequestClose={() => { }}
      from='left'
      width='362px'
      hideHeader={true} >
      <LocationCard
        image={selectedLocation.img}
        name={selectedLocation.name}
        address={selectedLocation.address}
        onStartChargingClick={onStartChargingClick}
      />
      {stations.map((station, index) => (
        <StationCard
          key={station.id}
          station={station}
          stationNumber={index + 1}
        />))}
    </Pane>
  );
}

export default SlidingPane;