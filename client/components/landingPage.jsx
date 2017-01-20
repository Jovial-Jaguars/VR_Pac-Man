import React from 'react';
import LoginForm from './login';
import SignupForm from './signup';
import TopNav from './topNav';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.mazebuilderClick = this.mazebuilderClick.bind(this);
    this.mazestoreClick = this.mazestoreClick.bind(this);
  }

  navClickHome() {
  }

  modalClickLogin() {
    $('.modal').css('display', 'block');
    $('#modal-signupform').css('display', 'none');
    $('#modal-loginform').css('display', 'block');
    $('#login-username').focus();
  }

  modalClickSignup() {
    $('.modal').css('display', 'block');
    $('#modal-loginform').css('display', 'none');
    $('#modal-signupform').css('display', 'block');
    $('#signup-username').focus();
  }

  modalClickExit() {
    $('.modal').css('display', 'none');
  }

  mazebuilderClick() {
    this.props.router.push({pathname: '/mazebuilder'});
  }

  mazestoreClick() {
    this.props.router.push({pathname: '/mazestore'});
  }

  signupFormSubmit(e) {
    e.preventDefault()
    var username = $('#signup-username').val();
    var dataString = $('#signupForm').serialize();
    $.ajax({
      type: 'POST',
      url: '/signup',
      data: dataString,
      success: function() {
        if (!username) {
          console.log('signup !username', username);
          this.props.router.push({pathname: '/'});
        } else {
          window.username = username;
          this.props.router.push({pathname: '/profile'});
        }
      }.bind(this)
    })
  }

  loginFormSubmit(e) {
    e.preventDefault();
    var username = $('#login-username').val();
    console.log('username:', username);
    var dataString = $('#loginForm').serialize();
    $.ajax({
      type: 'POST',
      url: '/login',
      data: dataString,
      success: function(data) {
        console.log('successfully logged in!', data);
        if (!username) {
          this.props.router.push({pathname: '/'});
        } else {
          window.username = username;
          this.props.router.push({pathname: '/profile'});
        }
      }.bind(this)
    })
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: '/checkLoggedIn',
      async: false,
      success: function(data) {
        if (!data.user) {
          console.log('hit not authenticated');
          this.props.router.push({pathname: '/'});
        } else {
          console.log("hit authenticated");
          console.log(data.user);
          window.username = data.user;
          this.props.router.push({pathname: '/profile'});
        }
      }.bind(this),
      error: function() {
        console.log('Error!');
      }
    });
  }

  render() {
    return (
    <div>
      <TopNav router={this.props.router}/>
      <nav>
        <button id="nav-login" onClick={this.modalClickLogin}>Login</button>
        <button id="nav-signup" onClick={this.modalClickSignup}>Signup</button>
      </nav>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-header-flexbox">
              <button id="modal-login" onClick={this.modalClickLogin}>Login</button>
              <button id="modal-signup" onClick={this.modalClickSignup}>Signup</button>
            </div>
            <span className="close" onClick={this.modalClickExit}>&times;</span>
          </div>
          <div id="modal-loginform">
            <h2 id="formheader">Login</h2>
            <LoginForm loginFormSubmit={this.loginFormSubmit.bind(this)}/>
          </div>
          <div id="modal-signupform">
            <h2 id="formheader">Signup</h2>
            <SignupForm signupFormSubmit={this.signupFormSubmit.bind(this)}/><br/>
            <p>Already have an account? <a onClick={this.modalClickLogin}>Login</a></p>
          </div>
          <div>
            <h3> </h3>
          </div>
        </div>
      </div>
      <div className="landingPageContent">
          <h1 className="headers">Welcome to VR Pacman!</h1>
        <div className="playBtnContent">
          <button id="demobutton"><span className="playText">Play</span><br/>Demo Version</button>
          <p>For multiplayer mode, high scores, custom mazes and more, create a FREE account!</p>
        </div>
        <h1 className="headers">How to Play:</h1>
        <p>VR: Insert mobile phone into a VR headset. Align to center. Look around to change your direction! Collect the pellets while avoiding the ghosts!<br/>
          PC: Click and drag to change your direction! Collect the pellets while avoiding the ghosts!
        </p>
        <p className="legalnotice">Legal notice: This website is not related or endorsed by the registered trademark owners Namco, Inc.<br/>
          Background Pacman and ghost icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> and <a href="http://www.flaticon.com/authors/tutsplus" title="TutsPlus">TutsPlus</a> respectively and is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
      </div>
      <img id="ghostBackgroundPic" src="../assets/pac-man-ghost.png"/>
      <img id="pacmanBackgroundPic" src="../assets/pac-man.png"/>
    </div>
    );
  }
}


window.onclick = function(event) {
  var modal = document.getElementById('myModal');
  var htpModal = document.getElementById('htpModal');
  var customModal = document.getElementById('customModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
    if (event.target == htpModal) {
        htpModal.style.display = 'none';
    }
    if (event.target == customModal) {
        customModal.style.display = 'none';
    }
}

