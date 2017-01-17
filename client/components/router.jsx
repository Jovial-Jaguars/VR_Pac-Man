// // Reactrouter was imported via cdn - defining often-used react-router variables here
import {Router, Route, browserHistory, Link} from 'react-router';
import LandingPage from './landingPage';
import ProfilePage from './profilePage';
import App from './app';
import MazeStore from './store';
import ReactDOM from 'react-dom';
import React from 'react';

// React router that switches between signin, signup, and pet app
var MainRouter = () => (
   <Router history={browserHistory}>
    <Route path="/" component={LandingPage} />
    <Route path="/profile" component={ProfilePage} />
    <Route path="/mazebuilder" component={App} />
    <Route path="/mazestore" component={MazeStore} />
  </Router>
);

ReactDOM.render(<MainRouter />, document.getElementById('app'));

