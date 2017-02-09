import React from 'react';
import LoginForm from './login';
import SignupForm from './signup';
import TopNav from './topNav';
import {Router, Route, browserHistory, Link} from 'react-router';

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
      success: function(data) {
        console.log(data)
        $('#signupForm input[type=text]').val('');
        $('#signupForm input[type=password]').val('');
        if (data.message) {
          console.log(data.message);
          // render error message on form
          $('.authError.signupError').css('display', 'block');
          $('.authError.signupError').text(data.message);
          // $('#signupForm input[type=text]').val('');
          // $('#signupForm input[type=password]').val('');
          $('#signup-username').focus();
          // this.props.router.push({pathname: '/'});
        } else {
          // // set cookie
          // document.cookie = data.token;
          // localStorage.setItem('username', data.username);
          // console.log(document.cookie);
          // this.props.router.push({pathname: '/profile'});
          var modal = document.getElementById('myModal');
          modal.style.display = 'none'
          alert('Please check your email to confirm registration and log in!');
        }
      }.bind(this),
      error: function(err) {
        console.log('error:', err);
      }
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
        console.log('success cb:',data);
        if (data.message) {
          console.log(data.message);
          // render error on form
          $('.authError.loginError').css('display', 'block');
          $('.authError.loginError').text(data.message);
          // clear form?
          $('#loginForm input[type=text]').val('');
          $('#loginForm input[type=password]').val('');
          $('#login-username').focus();
        } else {
          $('.authError').css('display', 'none');
          document.cookie = data.token;
          localStorage.setItem('username', data.username);
          this.props.router.push({pathname: '/profile'});
        }
        // console.log('successfully logged in!', data);
        // if (!username) {
        //   this.props.router.push({pathname: '/'});
        // } else {
        //   window.username = username;
        // this.props.router.push({pathname: '/profile'});
        // }
      }.bind(this),
      error: function(err) {
        console.log(err);
        console.log(err.status);
        $('.authError.loginError').css('display', 'block');
        if (err.status === 429) {
          $('.authError.loginError').text('Too many requests, try again later.');
        } else {
          $('.authError.loginError').text('Invalid credentials.');
        }
      }
    })
  }
   demoButtonClick(e) {
    console.log(browserHistory.maze);
    browserHistory.maze = [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
                         [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                         [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                         [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                         [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                         [1, 2, 2, 2, 5, 2, 2, 2, 2, 6, 2, 2, 2, 1, 2, 1],
                         [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
                         [1, 1, 1, 1, 2, 1, 3, 4, 0, 0, 0, 0, 0, 1, 2, 1],
                         [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
                         [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
                         [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
                         [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                         [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                         [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                         [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
                         [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]];

    // var str = '';
    // var arr = [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
    //            [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
    //            [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
    //            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    //            [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
    //            [1, 2, 2, 2, 5, 2, 2, 2, 2, 6, 2, 2, 2, 1, 2, 1],
    //            [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
    //            [1, 1, 1, 1, 2, 1, 3, 4, 0, 0, 0, 0, 0, 1, 2, 1],
    //            [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
    //            [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
    //            [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
    //            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    //            [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
    //            [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
    //            [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    //            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]];
    // for(var i = 0; i < arr.length; i++) {
    //   for(var j =0; j < arr[i].length; j++) {
    //     str = str + arr[i][j];
    //   }
    // }
    // browserHistory.maze = str;
    // browserHistory.maze = [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
    //                  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
    //                  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
    //                  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    //                  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
    //                  [1, 2, 2, 2, 5, 2, 2, 2, 2, 6, 2, 2, 2, 1, 2, 1],
    //                  [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
    //                  [1, 1, 1, 1, 2, 1, 3, 4, 0, 0, 0, 0, 0, 1, 2, 1],
    //                  [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
    //                  [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
    //                  [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
    //                  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    //                  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
    //                  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
    //                  [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    //                  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]]
      this.props.router.push({pathname: '/unranked'});
  }

  componentWillMount() {
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
            <LoginForm loginFormSubmit={this.loginFormSubmit.bind(this)}/><br/>
            <p className="authError loginError"></p>
          </div>
          <div id="modal-signupform">
            <h2 id="formheader">Signup</h2>
            <SignupForm signupFormSubmit={this.signupFormSubmit.bind(this)}/><br/>
            <p className="authError signupError"></p>
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
          <button id="demobutton" onClick={this.demoButtonClick.bind(this)}><span className="playText">Play</span><br/>Demo Version</button>
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

