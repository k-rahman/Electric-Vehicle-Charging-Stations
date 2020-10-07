import React from 'react';
import { Link } from 'react-router-dom';
import { Marker } from 'react-map-gl';

const server = process.env.REACT_APP_SERVER;

const MapMarker = ({ locations, onMarkerClick }) => {
  return (
    locations.map(location =>
      <Marker
        key={location.id}
        latitude={location.lat}
        longitude={location.lng}
        offsetLeft={20}
        offsetTop={-20}>
        <Link 
          to={`/locations/${location.id}`} 
          className='remove-focus-outline'>
          <img
            className='marker-img'
            onMarkerClick={onMarkerClick}
            src={`${server}/icons/charging-station.svg`}
            alt='Charging Station' />
        </Link>
      </Marker>
    )
  );
}

export default MapMarker;