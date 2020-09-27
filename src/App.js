import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import Login from './components/Pages/login';
import Setting from './components/Pages/setting';
import Dashboard from './components/Pages/dashboard';
import Laporan from './components/Pages/laporan';

import privateRoute from './components/Utils/privateRoute';
import publicRoute from './components/Utils/publicRoute';
import {getToken, removeUserSession, setUserSession} from './components/Utils/common';


function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get('https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/login/?username=aldo&password=aldo').then(Response => {
      setUserSession(Response.data.token, Response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Setting" component={Setting} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Laporan" component={Laporan} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
