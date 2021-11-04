import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Details from './components/Details/Details'
import Create from './components/CreateDog/CreateDog'

function App() {
  return (
    <BrowserRouter>
      <Route exact path= "/" component= {LandingPage}/>
      <Route exact path= "/home" component= {Home}/>
      <Route exact path= "/create" component= {Create}/>
      <Route exact path= "/details/:id" component= {Details}/>
    </BrowserRouter>
  );
}

export default App;
