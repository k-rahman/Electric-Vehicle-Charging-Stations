import React, { useEffect, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import debounce from 'lodash.debounce';


const Map = () => {
   const [viewport, setViewport] = useState({
      width: '100wh',
      height: '100vh',
      latitude: 61.9241,
      longitude: 25.7482,
      zoom: 6
   });

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setViewport({
        ...viewport,
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, 150);

   window.addEventListener('resize', debouncedHandleResize)

   return _ => {
    window.removeEventListener('resize', debouncedHandleResize)
  }
  
  })

   const TOKEN =process.env.REACT_APP_MAPBOX_TOKEN;

   return (
   <div>
      <ReactMapGL
         {...viewport}
         mapboxApiAccessToken={TOKEN}
         onViewportChange={nextViewport => setViewport(nextViewport)} 
         mapStyle='mapbox://styles/mapbox/streets-v11' />
         {console.log('rendered')}
         </div>
   );

};

export default Map;
