import React, { useState, useEffect } from 'react';
import { Route, useHistory, Switch, Redirect } from 'react-router-dom';
import { getLocations, getLocationById } from './services/locationService';
import { getStationsByLocationId } from './services/stationService';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from './components/common/NavBar';
import Map from './components/Map';
import SlidingPane from './components/SlidingPane';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import Activation from './components/Activation';
import NotFound from './components/common/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
   const [showLogin, setShowLogin] = useState(false);
   const [showRegister, setShowRegister] = useState(false);
   const [activate, setActivate] = useState(false);
   const [loggedIn, setLoggedIn] = useState(null);
   const [locations, setLocations] = useState([]);
   const [selectedLocation, setSelectedLocation] = useState(null);
   const [stations, setStations] = useState([]);
   const [outletsStatus, setOutletsStatus] = useState(0);
   const history = useHistory();

   useEffect(() => {
      const fetchLocations = async () => {
         const { data } = await getLocations();
         setLocations(data);
      }
      fetchLocations();

      logIn();

      history.listen(handleRouterChange)
   }, []);

   useEffect(() => {
      const fetchStations = async () => {
         const { data } = await getStationsByLocationId(selectedLocation.id);
         setStations(data);
      }

      if (selectedLocation) {
         fetchStations();
      }
   }, [selectedLocation]);

   const handleLocationChange = async locationId => {
      const { data: location } = await getLocationById(locationId);
      setSelectedLocation(location);
   };

   const handleModalOpen = ({ currentTarget: link }) => {
      if (link.name === 'Login') setShowLogin(true);
      if (link.name === 'Register') setShowRegister(true);
      if (link.name === 'Logout') {
         localStorage.removeItem('name')
         window.location.reload();
      }
      if (link.name === 'activate' && loggedIn)
      {
         console.log('Activating');
         setActivate(true);
      }else{
         toast.dark('You need to log in before you can use the service.');
      }
   };

   const handleModalClose = () => {
      console.log(activate)
      setShowLogin(false);
      setShowRegister(false);
      setActivate(false);
   };

   const handlePopupClose = () => {
      setSelectedLocation(null);
      history.push('/');
   };

   const handleRouterChange = () => {
      if (history.location.pathname === '/')
         setSelectedLocation(null);
   };

   const checkOutletStatus = outlets => {
      for (let outlet of outlets) {
         if (outlet.status === 'Available') {
            setOutletsStatus(1);
         }
      }
   }

   const logIn = () => {
      if (!loggedIn) {
         toast.dark('Successfully logged in!');
      }
         const user = localStorage.getItem('name');
         setLoggedIn(user);
   };

   return (
      <>
         <ToastContainer
            autoClose={2000}
            hideProgressBar={true}
            pauseOnHover={false}
            pauseOnFocusLose={false}
            closeButton={false}
            limit={1}
         />
         <NavBar
            siteName='EVCS'
            user={loggedIn}
            onLinkClick={handleModalOpen}
         />
         <Switch>
            <Route
               path={['/locations/:id', '/']} exact
               render={props =>
                  <>
                     <Map
                        locations={locations}
                        selectedLocation={selectedLocation}
                        onPopupClose={handlePopupClose}
                        {...props} />

                     <SlidingPane
                        selectedLocation={selectedLocation}
                        onLocationChange={handleLocationChange}
                        stations={stations}
                        status={outletsStatus}
                        checkStatus={checkOutletStatus}
                        onChargingClick={handleModalOpen}
                        {...props} />
                  </>} />
            <Route path='*' component={NotFound} />
         </Switch>
         {(showLogin) && <LoginForm onModalClose={handleModalClose} />}
         {(showRegister) && <Register onModalClose={handleModalClose} />}
         {(activate) && <Activation onModalClose={handleModalClose} />}
         Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </>
   );
}

export default App;
