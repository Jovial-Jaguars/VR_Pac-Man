import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myMaps: [],
      username: null,
      savedMaps: null,
      spHighScore: null,
      mpHighScore: null
    }
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/verifyAuth',
      async: false,
      success: function(data) {
        if (data.success) {
          $('#topnav>#nav-profile').css('display', 'block');
          $('#topnav>#nav-auth').css('display', 'none');
        } else {
          $('#topnav>#nav-profile').css('display', 'none');
          $('#topnav>#nav-auth').css('display', 'block');
        }
      }.bind(this)
    });

    $.ajax({
      type: 'GET',
      url: 'profileInfo',
      async: false,
      success: function(data) {
        if (data.success) {
          this.setState({
            username: data.user.username,
            spHighScore: data.spHighScores_PC,
            mpHighScore: data.mpHighScores_PC
          });
          localStorage.setItem('username', data.user.username);
        }
      }.bind(this)
    });
  }

  navClickHome() {
    this.props.router.push({pathname: '/'});
  }

  navClickMazeBuilder() {
    this.props.router.push({pathname: '/mazebuilder'});
  }

  navClickStore() {
    this.props.router.push({pathname: '/mazestore'});
  }

  navClickAbout() {
    this.props.router.push({pathname: '/about'});
    // this.props.router.push({pathname: '/resetpassword'});
  }

  navClickLogin() {
    $('.modal').css('display', 'block');
    $('#modal-signupform').css('display', 'none');
    $('#modal-forgotpassword').css('display', 'none');
    $('#modal-loginform').css('display', 'block');
    $('#login-username').focus();
  }

  navClickSignup() {
    $('.modal').css('display', 'block');
    $('#modal-loginform').css('display', 'none');
    $('#modal-forgotpassword').css('display', 'none');
    $('#modal-signupform').css('display', 'block');
    $('#signup-username').focus();
  }

  logout() {
    $.ajax({
      type: 'GET',
      url: '/logout',
      success: function() {
        localStorage.clear();
        this.props.router.push({pathname: '/'});
      }.bind(this)
    })
  }

  render() {
    return (
      <nav>
        <ul id="topnav">
          <li id="topleft"></li>
          <li id="nav-home" onClick={this.navClickHome.bind(this)}>Home</li>
          <li onClick={this.navClickMazeBuilder.bind(this)}>MazeBuilder</li>
          <li onClick={this.navClickStore.bind(this)}>Store</li>
          <li onClick={this.navClickAbout.bind(this)}>About</li>
          <li id="nav-auth"onClick={this.navClickLogin.bind(this)}>Login</li>
          <li id="nav-auth" onClick={this.navClickSignup.bind(this)}>Signup</li>
          <li id="nav-profile"></li>
          <li id="nav-profile">
            <div id="profileStats">
              <p id="welcomeMessage">Welcome {this.state.username}</p>
              <p>SP High Score: {this.state.spHighScore}</p>
              <p>MP High Score: {this.state.mpHighScore}</p>
              <button id="logout" onClick={this.logout.bind(this)}>Log Out</button>
            </div>
          </li>
        </ul>
      </nav>
      );
  }
}