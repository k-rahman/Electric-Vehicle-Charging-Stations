import React, { useEffect } from 'react';
import Pane from 'react-sliding-pane';
import LocationCard from './LocationCard';
import StationCard from './StationCard';
import "react-sliding-pane/dist/react-sliding-pane.css";

const SlidingPane = (props) => {

  const {
    selectedLocation,
    onLocationChange,
    stations,
    status,
    checkStatus,
    onChargingClick,
    match
  } = props;

  useEffect(() => {
    onLocationChange(match.params.id);
  }, [match.params.id]);

  return (
    selectedLocation &&
    <Pane
      isOpen={true}
      className='sliding-pane-content'
      overlayClassName='sliding-pane-overlay'
      onRequestClose={() => { }}
      from='left'
      width='350px'
      hideHeader={true} >
      <LocationCard
        image={selectedLocation.img}
        name={selectedLocation.name}
        address={selectedLocation.address}
      />
      {stations.map((station, index) => (
        <StationCard
          key={station.id}
          station={station}
          outlets={station.outlets}
          stationNumber={index + 1}
          checkStatus={checkStatus}
          status={status}
          onChargingClick={onChargingClick}
        />))}
    </Pane>
  );
}

export default SlidingPane;