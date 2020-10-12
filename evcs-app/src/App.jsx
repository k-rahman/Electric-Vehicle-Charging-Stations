import React, { useState, useEffect } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getLocations, getLocationById } from './services/locationService';
import { getStationsByLocationId } from './services/stationService';
import { getHistoryByUserId } from './services/historyService';
import NavBar from './components/common/NavBar';
import Map from './components/Map';
import SlidingPane from './components/SlidingPane';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import History from './components/History';
import Activation from './components/Activation';
import Monitor from './components/Monitor';
import NotFound from './components/common/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { login } from './services/authService';

let historySearch = [];

const App = () => {
   const [showLogin, setShowLogin] = useState(false);
   const [showRegister, setShowRegister] = useState(false);
   const [showHistory, setShowHistory] = useState(false);
   const [showActivate, setShowActivate] = useState(false);
   const [loggedIn, setLoggedIn] = useState(null);
   const [locations, setLocations] = useState([]);
   const [selectedLocation, setSelectedLocation] = useState(null);
   const [stations, setStations] = useState([]);
   const [outletInUse, setOutletInUse] = useState(null);
   const [userHistory, setUserHistory] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const history = useHistory();

   useEffect(() => {
      const fetchLocations = async () => {
         const { data } = await getLocations();
         setLocations(data);
      }
      fetchLocations();

      const user = localStorage.getItem('name');
      setLoggedIn(user);

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
   }, [selectedLocation, outletInUse]);

   useEffect(() => {
      const filtered = historySearch.filter(h => {
         return h.name.toLowerCase().includes(searchQuery.toLowerCase())
      });

      setUserHistory(filtered);
   }, [searchQuery]);


   const handleLocationSelect = async locationId => {
      const { data: location } = await getLocationById(locationId);
      console.log('location data is ', location);
      setSelectedLocation(location);
   }

   const handleModalOpen = ({ currentTarget: link }) => {
      if (link.name === 'Login') setShowLogin(true);
      else if (link.name === 'Register') setShowRegister(true);
   }

   const handleModalClose = () => {
      setShowLogin(false);
      setShowRegister(false);
      setShowActivate(false);
      setShowHistory(false);
   }

   const handlePopupClose = () => {
      setSelectedLocation(null);
      history.push('/');
   }

   const handleRouterChange = () => {
      if (history.location.pathname === '/')
         setSelectedLocation(null);
   }

   const handlestartCharging = outlet => {
      setShowActivate(false);
      setOutletInUse(outlet);
   }

   const handleMonitorClose = () => {
      setOutletInUse(null);
   }

   const handleLogIn = () => {
      toast.dark('Successfully logged in!');
      const user = localStorage.getItem('name');
      setLoggedIn(user);
   }

   const handleLogout = () => {
      toast.dark('You are now logged out.');
      localStorage.removeItem('name')
      setLoggedIn(null);
   }

   const handleShowActivate = () => {
      loggedIn ? 
      setShowActivate(true) : 
      toast.dark('You need to be logged in to use the service.');
   }

   const handleHistoryClick = async () => {
      const userId = localStorage.getItem('userId');
      try {
         const { data: history } = await getHistoryByUserId(userId);
         if (history) {
            setShowHistory(true);
            setUserHistory(history);
            historySearch = [...history];
         }
      }
      catch (ex) {
      }
   }

   const handleHistorySearch = query => {
      setSearchQuery(query);
   }

   return (
      <>
         <ToastContainer
            autoClose={3000}
            hideProgressBar={true}
            pauseOnHover={false}
            pauseOnFocusLose={false}
            closeButton={false}
            limit={1}
         />
         <NavBar
            siteName='EVCS'
            user={loggedIn}
            onLogout={handleLogout}
            onLinkClick={handleModalOpen}
            onHistoryClick={handleHistoryClick}
         />
         <Switch>
            <Route
               path={['/locations/:id', '/']} exact
               render={props =>
                  <>
                     <Map
                        locations={locations}
                        selectedLocation={selectedLocation}
                        onResult={handleLocationSelect}
                        onPopupClose={handlePopupClose}
                        {...props} />

                     <SlidingPane
                        selectedLocation={selectedLocation}
                        stations={stations}
                        onLocationSelect={handleLocationSelect}
                        onStartChargingClick={handleShowActivate}
                        {...props} />
                  </>} />
            <Route path='*' component={NotFound} />
         </Switch>
         {(showLogin) && <LoginForm onModalClose={handleModalClose} loggedIn={handleLogIn}/>}
         {(showRegister) && <Register onModalClose={handleModalClose} />}
         {(showHistory) &&
            <History
               onModalClose={handleModalClose}
               data={userHistory}
               onValueChange={handleHistorySearch}
               searchQuery={searchQuery} />
         }
         {(showActivate) &&
            <Activation
               onModalClose={handleModalClose}
               onStartCharging={handlestartCharging}
               selectedLocation={selectedLocation} />
         }
         {(outletInUse) &&
            <Monitor
               onMonitorClose={handleMonitorClose}
               selectedLocation={selectedLocation}
               outlet={outletInUse} />
         }

         Icons made by 
         <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from 
         <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </>
   );
}

export default App;
