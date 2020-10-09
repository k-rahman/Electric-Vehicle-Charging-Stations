import React, { useState, useEffect } from 'react';
import { Route, useHistory, Switch, Redirect } from 'react-router-dom';
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
import Monitor from './components/common/Monitor';
import NotFound from './components/common/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

let historySearch = [];

const App = () => {
   const [showLogin, setShowLogin] = useState(false);
   const [showRegister, setShowRegister] = useState(false);
   const [showHistory, setShowHistory] = useState(false);
   const [showActivate, setShowActivate] = useState(false);
   const [loggedIn, setLoggedIn] = useState(null);
   const [locations, setLocations] = useState([]);
   const [stations, setStations] = useState([]);
   const [userHistory, setUserHistory] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const [outletInUse, setOutletInUse] = useState(null);
   const [selectedLocation, setSelectedLocation] = useState(null);
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
      console.log('ModalOpen')
      if (link.name === 'Login') setShowLogin(true);
      else if (link.name === 'Register') setShowRegister(true);


      // possibly own function
      else if (link.name === 'activate' && loggedIn)
         setShowActivate(true);
      else if (link.name === 'activate' && !loggedIn)
         toast.dark('You need to be logged in to use the service.');


      // Logout maybe move to own function
      else if (link.name === 'Logout') {
         localStorage.removeItem('name')
         window.location.reload();
      }
   };

   const handleModalClose = () => {
      setShowLogin(false);
      setShowRegister(false);
      setShowActivate(false);
      setShowHistory(false);
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
      console.log(outlets);
      for (let outlet of outlets) {
         if (outlet.status === 'Available') {
            setOutletsStatus(1);
            console.log('outlet status updated');
         } else {
            setOutletsStatus(0);
         }
      }
   };

   const startCharging = outlet => {
      setShowActivate(false);
      setOutletInUse(outlet);
   };

   const handleMonitorClose = () => {
      setOutletInUse(null);
   }

   const logIn = () => {
      // if (!loggedIn) {
      //    toast.dark('Successfully logged in!');
      // }
      const user = localStorage.getItem('name');
      setLoggedIn(user);
   };

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
      const filtered = historySearch.filter(h => {
         return h.name.toLowerCase().includes(searchQuery.toLowerCase())
      })
      setUserHistory([...filtered]);
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
                        onPopupClose={handlePopupClose}
                        {...props} />

                     <SlidingPane
                        selectedLocation={selectedLocation}
                        onLocationChange={handleLocationChange}
                        stations={stations}
                        status={outletsStatus}
                        checkStatus={checkOutletStatus}
                        onStartHereClick={handleModalOpen}
                        {...props} />
                  </>} />
            <Route path='*' component={NotFound} />
         </Switch>
         {(showLogin) && <LoginForm onModalClose={handleModalClose} />}
         {(showRegister) && <Register onModalClose={handleModalClose} />}
         {(showHistory) && <History onModalClose={handleModalClose} data={userHistory} onValueChange={handleHistorySearch} searchQuery={searchQuery}/>}
         {(showActivate) &&
            <Activation
               onModalClose={handleModalClose}
               checkStatus={checkOutletStatus}
               startCharging={startCharging} />
         }
         {(outletInUse) &&
            <Monitor
               onMonitorClose={handleMonitorClose}
               checkStatus={checkOutletStatus}
               selectedLocation={selectedLocation}
               outlet={outletInUse} />
         }

         Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </>
   );
}

export default App;
