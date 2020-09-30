import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Map = () => {
   const [viewport, setViewport] = useState({
      width: '100wh',
      height: '100vh',
      latitude: 61.9241,
      longitude: 25.7482,
      zoom: 6
   });

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
