import React from 'react';
import { Popup } from 'react-map-gl';
import MapCard from './common/MapCard';

const MapPopup = ({ selectedLocation, onClose }) => {
  return (
    selectedLocation &&
    <Popup
      latitude={selectedLocation.lat}
      longitude={selectedLocation.lng}
      onClose={onClose}
      closeButton={true}
      dynamicPosition={true}
      tipSize={15}
      offsetLeft={20}
      offsetTop={-20}
      anchor="bottom"
    >
      <MapCard
        title={selectedLocation.name}
        text={selectedLocation.address}
      />
    </Popup>
  );
}

export default MapPopup;