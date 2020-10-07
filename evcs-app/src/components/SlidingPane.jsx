import React, { useState, useEffect } from 'react';
import { getStationsByLocationId } from '../services/stationService';
import Pane from 'react-sliding-pane';
import LocationCard from './LocationCard';
import StationCard from './StationCard';
import "react-sliding-pane/dist/react-sliding-pane.css";

const SlidingPane = ({ selectedLocation, onUrlChange, match, history }) => {
  const [stations, setStations] = useState([]);
  const [available, setAvailable] = useState(0);
  const [outOfService, setOutOfService] = useState(0);

  useEffect(() => {
    const fetchStations = async () => {
      const { data } = await getStationsByLocationId(selectedLocation.id);
      setStations(data);
    }

    if (selectedLocation)
      fetchStations();
  }, [selectedLocation]);



  const checkOutletStatus = outlets => {
    console.log('Pane is checking outlet status', outlets);
    for (let outlet of outlets) {
      if (outlet.status === 'Available') {
        console.log('First outlet with name ', outlet.id, ' is available')
        setAvailable(1);
        console.log('available set to ', available);
      }
      else if (outlet.status === 'outofservice') {
        setOutOfService('Out of Service');
      }
    }
  }

  // useEffect(() => {
  //   return history.listen(location => {
  //     if (history.action === 'PUSH' || history.action === 'PUSH') {
  //       onUrlChange(match.params.id);
  //     }
  //   });

  // }, []);

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
          checkOutletStatus={checkOutletStatus}
          available={available}
          outOfService={outOfService}
        />))}
    </Pane>
  );
}

export default SlidingPane;