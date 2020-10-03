import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Map from './components/Map';
import NavBar from './components/common/NavBar';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import './App.css';

const API = process.env.REACT_APP_EVCS_API;

const App = () => {
   const [locations, setLocations] = useState([]);
   const LINKS = [
      { name: 'Login', path: '/login' },
      { name: 'register', path: '/register' }
   ];

   useEffect(() => {
      console.log('mounted');
      axios
         .get(`${API}/api/locations`)
         .then(res => {
            setLocations(res.data);
         })
   }, []);

   return (
      <>
         <NavBar siteName='EVCS' Links={LINKS} />
         <Route path={['/locations/:id', '/']} render={routingProps =>
            <Map locations={locations} {...routingProps} />} />
         <Route path='/login' component={LoginForm} />
         <Route path='/Register' component={Register} />
         Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </>
   );
}

export default App;
