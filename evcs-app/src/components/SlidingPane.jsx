import React, { useEffect } from 'react';
import Pane from 'react-sliding-pane';
import Location from './Location';
import Station from './Station';
import "react-sliding-pane/dist/react-sliding-pane.css";

const SlidingPane = (props) => {

  const {
    selectedLocation,
    stations,
    match,
    getOutlets,
    outlets,
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
      <Location
        image={selectedLocation.img}
        name={selectedLocation.name}
        address={selectedLocation.address}
        stationsCount={stations.length}
        onStartChargingClick={onStartChargingClick}
      />
      {stations.map((station, index) => (
        <Station
          key={station.id}
          station={station}
          stationNumber={index + 1}
          getOutlets={getOutlets}
          outlets={outlets}
        />))}
    </Pane>
  );
}

export default SlidingPane;