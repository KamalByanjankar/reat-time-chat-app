import React, { useState } from 'react';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar/Sidebar';

import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <Sidebar />
        </Router>
      )}
    </div>
  )
}

export default App;
