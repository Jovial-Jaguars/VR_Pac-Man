// // Reactrouter was imported via cdn - defining often-used react-router variables here
import {Router, Route, browserHistory, Link} from 'react-router';
import LandingPage from './landingPage';
import ProfilePage from './profilePage';
import App from './app';
import MazeStore from './store';
import ReactDOM from 'react-dom';
import React from 'react';
import MultiplayerMazeRunner from './multiplayerMazeRunner';

// React router
var MainRouter = () => (
   <Router history={browserHistory}>
    <Route path="/profile" component={ProfilePage} />
    <Route path="/mazebuilder" component={App} />
    <Route path="/multiplayer" component={MultiplayerMazeRunner} />
    <Route path="/mazestore" component={MazeStore} />
    <Route path="/" component={App} />
  </Router>
);

ReactDOM.render(<MainRouter />, document.getElementById('app'));