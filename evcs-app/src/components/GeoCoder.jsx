import React from 'react';
import { useEffect } from 'react';
import GlGeocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const GeoCoder = ({ mapRef, onViewportChange, forwardGeocoder, render, containerRef, onResult }) => {

  return (
    <GlGeocoder
      mapRef={mapRef}
      containerRef={containerRef}
      mapboxApiAccessToken={TOKEN}
      onViewportChange={onViewportChange}
      localGeocoder={forwardGeocoder}
      render={render}
      countries="FI"
      position="top-right"
      reverseGeocode={true}
      zoom ={17}
      placeholder='Search for a charging location'
      clearAndBlurOnEsc={true}
      clear
      minLength={0}
      enableEventLogging={false}
      onResult={query => onResult(query.result.id)}
    />
  );
}

export default GeoCoder;