import React from 'react';
import { Link } from 'react-router-dom';
import { Marker } from 'react-map-gl';

const API = process.env.REACT_APP_EVCS_API;

const MapMarker = ({ locations }) => {
  return (
    locations.map(location =>
      <Marker
        key={location.id}
        latitude={location.lat}
        longitude={location.lng}
        offsetLeft={20}
        offsetTop={-20}>
        <Link to={`/locations/${location.id}`}>
          <img
            className='marker-img'
            src={`${API}/icons/charging-station.svg`}
            alt='Charging Stations' />
        </Link>
      </Marker>
    )
  );
}

export default MapMarker;