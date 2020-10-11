import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl';
import debounce from 'lodash.debounce';
import MapMarker from './MapMarker';
import MapPopup from './MapPopup';
import GeoCoder from './GeoCoder';
import "mapbox-gl/dist/mapbox-gl.css";
import styles from '../assets/css/mapGeocoder.module.css';

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const server = process.env.REACT_APP_SERVER;

const Map = ({ locations, selectedLocation, onPopupClose, onResult }) => {
  const [viewport, setViewport] = useState({
    width: '100wh',
    height: '100vh',
    latitude: 61.9241,
    longitude: 25.7482,
    zoom: 5,
  });

  const transition = {
    transitionDuration: 4000,
    transitionInterpolator: new FlyToInterpolator()
  };

  // GeoCoder needs a map ref
  const mapRef = useRef();
  const geocoderContainerRef = useRef();

  // fix map size when window is resized
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setViewport({
        ...viewport,
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, 150);

    window.addEventListener('resize', debouncedHandleResize);

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize);
    }
  }, [viewport])

  // Go to Click location and show Popup. Called when id change.
  // click location is fetched from server so when user click back button,
  // it go to previously clicked locations
  const handleMarkerClick = location => {
    console.log(location)
    setViewport({ ...viewport, latitude: location.lat, longitude: location.lng, transitionDuration: 1000 });
  }

  // in here i will pass my array of locations and map them to Geojson features
  function handleForwardGeocoder(query) {
    var matchingFeatures = [];

    for (var i = 0; i < locations.length; i++) {
      var feature = locations[i];
      if (
        feature.name
          .toLowerCase()
          .search(query.toLowerCase()) !== -1 ||
        feature.address
          .toLowerCase()
          .search(query.toLowerCase()) !== -1
      ) {

        feature['place_name'] = feature.name;
        feature['address'] = feature.address;
        feature['center'] = new Array(feature.lng, feature.lat);
        feature['place_type'] = ['charging location'];

        matchingFeatures.push(feature);
      }
    }

    return matchingFeatures;
  }

  // change how geocoder result are rendered
  function handleRender(item) {
    if (item.name) {
      return (
        '<span><image src="' + server + '/icons/charging-station(20x20).png" /> '
        + item.name + '</span><br/><small>' + item.address + '</small>'
      )
    }
    else if (item.properties.address)
      return '<span><image src="' + server + '/icons/finland.svg" />' + item.text + '</span><br/><small>' + item.properties.address + '</small>'
    else
      return '<span>' + item.text + '</span><br/><small>' + item['place_name'] + '</small>'
  }

  return (
    <>
      <div
        ref={geocoderContainerRef}
        className={styles.geo}
      />
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        onClick={onPopupClose}
        maxZoom={17}
        minZoom={4}
        maxPitch={0}
        dragRotate={false}
        mapStyle='mapbox://styles/abadddddon/ckfsbrhh21yyq19t8rvrtx098' >
        <MapMarker
          locations={locations}
          onMarkerClick={handleMarkerClick}
        />
        <MapPopup
          selectedLocation={selectedLocation}
          onClose={onPopupClose}
        />
        <GeoCoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={nextViewport => setViewport({ ...nextViewport, ...transition })}
          forwardGeocoder={handleForwardGeocoder}
          render={handleRender}
          onResult={onResult}
        />
      </ReactMapGL>
    </>
  );

};

export default Map;
