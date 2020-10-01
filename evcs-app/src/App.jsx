import React from 'react';
import { Route } from 'react-router-dom';
import Map from './components/Map';
import NavBar from './components/common/NavBar';
import LoginForm from './components/LoginForm';
import Register from './components/Register';

function App() {
   const LINKS = [
         {name: 'Login', path: '/login'},
         {name: 'register', path: '/register'}
      ];

  return (
  <>
      <NavBar siteName='EVCS' Links={LINKS}/>
      <Route path='/' component={Map} />
      <Route path='/login' component={LoginForm} />
      <Route path='/Register' component={Register} />
   </>
  );
}

export default App;
