import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import Login from './components/pages/login';
import Setting from './components/pages/setting';
import Dashboard from './components/pages/dashboard';
import Laporan from './components/pages/laporan';

function App() {
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
