import React from 'react';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar/Sidebar';

import './App.css';

import {BrowserRouter as Router} from 'react-router-dom'
import { useStateValue } from './context/StateProvider';

function App() {
  const [{user}] = useStateValue(null)

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
