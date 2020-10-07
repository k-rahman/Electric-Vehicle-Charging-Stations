import React from 'react';
import GlGeocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";


const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const GeoCoder = ({ mapRef, onViewportChange }) => {
  return (
    <GlGeocoder
      mapRef={mapRef}
      mapboxApiAccessToken={TOKEN}
      onViewportChange={onViewportChange}
      //localGeocoder={forwardGeocoder}
      //render={handleRender}
      countries="FI"
      position="top-right"
      reverseGeocode={true}
      enableEventLogging={false}
    />
  );
}

export default GeoCoder;