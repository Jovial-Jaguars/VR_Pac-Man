// // Reactrouter was imported via cdn - defining often-used react-router variables here
import {Router, Route, browserHistory, Link, withRouter} from 'react-router';
import LandingPage from './landingPage';
import ProfilePage from './profilePage';
import Ranked from './ranked';
import Unranked from './unranked';
import App from './app';
import MazeStore from './store';
import ReactDOM from 'react-dom';
import React from 'react';
import MultiplayerMazeRunner from './multiplayerMazeRunner';
import MultiplayerRanked from './multiplayerRanked';
import MultiplayerCustom from './multiplayerCustom';
import MazeRunner from './mazeRunner';
import ResetPassword from './resetPassword';
import About from './about';

function requireAuth() {
    $.ajax({
        type: 'GET',
        url: '/verifyAuth',
        async: false,
        success: function(data) {
            if (!data.success) {
                console.log('checking 123')
                alert('Login or Signup to view this page. Signup is free!');
                browserHistory.replace('/')
            }
        }
    })
}

function checkAuth() {
    $.ajax({
        type: 'GET',
        url: '/verifyAuth',
        async: false,
        success: function(data) {
            if (data.success) {
                browserHistory.replace('/profile')
            }
        }
    })
}



function checkResetPasswordToken() {
    if (location.search) {
        console.log('location', location);
        console.log('search.slice', location.search.slice(8));
        var token = location.search.slice(8);
        $.ajax({
            type: 'GET',
            url: '/resetpasswordaccess',
            data: {token: token},
            success: function(data) {
                // do nothing
                console.log('success. data:', data);
                if (!data.access) {
                    browserHistory.replace('/')
                }
            },
            error: function() {
                console.log('Access denied. Your link is probably expired.');
                browserHistory.replace('/');
            }
        })
    }
}

// React router that switches between signin, signup, and pet app

var MainRouter = () => (
    <Router history={browserHistory}>
        <Route path="/" component={LandingPage} onEnter={checkAuth} />
        <Route path="/about" component={About} />
        <Route path="/unranked" component={Unranked} />
        <Route path="/ranked" component={Ranked} onEnter={requireAuth}/>
        <Route path="/profile" component={ProfilePage} onEnter={requireAuth}/>
        <Route path="/mazebuilder" component={App} onEnter={requireAuth}/>
        <Route path="/multiplayer" component={MultiplayerMazeRunner} onEnter={requireAuth}/>
        <Route path="/multiplayerRanked" component={MultiplayerRanked} onEnter={requireAuth}/>
        <Route path="/multiplayerCustom" component={MultiplayerCustom} onEnter={requireAuth}/>
        <Route path="/mazestore" component={MazeStore} onEnter={requireAuth}/>
        <Route path="/singleplayer" component={MazeRunner} onEnter={requireAuth}/>
        <Route path="/resetpassword" component={ResetPassword} onEnter={checkResetPasswordToken}/>
    </Router>
);


ReactDOM.render(<MainRouter />, document.getElementById('app'));