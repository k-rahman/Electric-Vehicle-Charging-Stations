import React from 'react';
import { Popup } from 'react-map-gl';
import MapCard from './common/MapCard'; // made by me

const MapPopup = ({ selectedLocation, onClose }) => {
  return (

    selectedLocation &&
    <Popup
      latitude={selectedLocation.lat}
      longitude={selectedLocation.lng}
      closeButton={true}
      onClose={onClose}
      anchor="bottom"
      dynamicPosition={true}
      tipSize={15}
      offsetLeft={20}
      offsetTop={-20}>
      <MapCard
        title={selectedLocation.name}
        text={selectedLocation.address}
      />
    </Popup>
  );
}

export default MapPopup;