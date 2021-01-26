import React from 'react';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar/Sidebar';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { useStateValue } from './context/StateProvider';
import Chat from './components/Chat/Chat/Chat';
import HomeScreen from './components/HomeScreen/HomeScreen';


function App() {
  const [{user}] = useStateValue(null)

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__container">
          <Router>
            <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route exact path="/">
                  <HomeScreen />
                </Route>
              </Switch>

          </Router>
        </div>
      )}
    </div>
  )
}

export default App;
