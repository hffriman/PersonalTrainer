import React from "react";
import Home from './pages/Home';
import Customerlist from './pages/Customerlist';
import Traininglist from './pages/Traininglist';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, 
Switch, Route } from 'react-router-dom';
import './App.css';

function App() {

  return (
    
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/customers' component={Customerlist} />
        <Route path='/trainings' component={Traininglist} />
      </Switch>

    </Router>
    
  );
}

export default App