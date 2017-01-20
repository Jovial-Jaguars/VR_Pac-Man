// // Reactrouter was imported via cdn - defining often-used react-router variables here
import {Router, Route, browserHistory, Link, withRouter} from 'react-router';
import LandingPage from './landingPage';
import ProfilePage from './profilePage';
import App from './app';
import MazeStore from './store';
import ReactDOM from 'react-dom';
import React from 'react';
import MultiplayerMazeRunner from './multiplayerMazeRunner';
import MultiplayerRanked from './multiplayerRanked';
import MultiplayerCustom from './multiplayerCustom';
import MazeRunner from './mazeRunner';
import About from './about';


// React router that switches between signin, signup, and pet app
var MainRouter = () => (
   <Router history={browserHistory}>
    <Route path="/" component={LandingPage} />
    <Route path="/profile" component={ProfilePage} />
    <Route path="/mazebuilder" component={App} />
    <Route path="/multiplayer" component={MultiplayerMazeRunner} />
    <Route path="/multiplayerRanked" component={MultiplayerRanked} />
    <Route path="/multiplayerCustom" component={MultiplayerCustom} />
    <Route path="/mazestore" component={MazeStore} />
    <Route path="/singleplayer" component={MazeRunner}/>
    <Route path="/about" component={About}/>
  </Router>
);


ReactDOM.render(<MainRouter />, document.getElementById('app'));