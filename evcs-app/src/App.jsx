import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { getLocations, getLocationById } from './services/locationService';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/common/NavBar';
import Map from './components/Map';
import SlidingPane from './components/SlidingPane';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const links = [
   { name: 'Login' },
   { name: 'Register' }
];

const App = () => {
   const [showLogin, setShowLogin] = useState(false);
   const [showRegister, setShowRegister] = useState(false);
   const [locations, setLocations] = useState([]);
   const [selectedLocation, setSelectedLocation] = useState(null);

   useEffect(() => {
      const fetchLocations = async () => {
         const { data } = await getLocations();
         setLocations(data);
      }
      fetchLocations();

   }, []);


   const handleModalOpen = ({ currentTarget: link }) => {
      if (link.name === 'Login') setShowLogin(true);
      if (link.name === 'Register') setShowRegister(true);
   }

   const handleModalClose = () => {
      setShowLogin(false);
      setShowRegister(false);
   };

   const handleLocationSelect = location => {
      setSelectedLocation(location);
   }

   const handleLocationChange = async locationId => {
      const { data: location } = await getLocationById(locationId);
      setSelectedLocation(location);
      console.log('selected location is now: ', selectedLocation)
   }

   const handlePopupClose = () => {
      setSelectedLocation(null);
   }

   // const handleNoLocationSelect = () => {
   //   this.setState({ showPopup: false });
   //   this.props.history.push('/');
   // };
   return (
      <>
         <ToastContainer />
         <NavBar siteName='EVCS' Links={links} onLinkClick={handleModalOpen} />
         <Route
            path={'/'}
            render={props =>
               <Map
                  locations={locations}
                  selectedLocation={selectedLocation}
                  onPopupClose={handlePopupClose}
                  onMarkerClick={handleLocationSelect}
                  {...props} />} />
         <Route
            path={'/locations/:id'}
            render={props =>
               <SlidingPane
                  selectedLocation={selectedLocation}
                  onUrlChange={handleLocationChange}
                  {...props} />} />
         {(showLogin) && <LoginForm onModalClose={handleModalClose} />}
         {(showRegister) && <Register onModalClose={handleModalClose} />}
         Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </>
   );
}

export default App;
