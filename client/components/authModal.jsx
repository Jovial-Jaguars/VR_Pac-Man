import React from 'react';
import LoginForm from './login';
import SignupForm from './signup';
import {Router, Route, browserHistory, Link} from 'react-router';

export default class AuthModal extends React.Component {
  constructor(props) {
    super(props);
  }

  navClickHome() {
  }

  modalClickLogin() {
    $('.modal').css('display', 'block');
    $('#modal-signupform').css('display', 'none');
    $('#modal-forgotpassword').css('display', 'none');
    $('#modal-loginform').css('display', 'block');
    $('#login-username').focus();
  }

  modalClickSignup() {
    $('.modal').css('display', 'block');
    $('#modal-loginform').css('display', 'none');
    $('#modal-forgotpassword').css('display', 'none');
    $('#modal-signupform').css('display', 'block');
    $('#signup-username').focus();
  }

  modalClickExit() {
    $('.modal').css('display', 'none');
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
        $('#signupForm input[type=text]').val('');
        $('#signupForm input[type=password]').val('');
        if (data.message) {
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
          $('.modal').css('display', 'none');
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
    var dataString = $('#loginForm').serialize();
    $.ajax({
      type: 'POST',
      url: '/login',
      data: dataString,
      success: function(data) {
        if (data.message) {
          // render error on form
          $('.authError.loginError').css('display', 'block');
          $('.authError.loginError').text(data.message);
          // clear form?
          $('#loginForm input[type=text]').val('');
          $('#loginForm input[type=password]').val('');
          $('#login-username').focus();
        } else {
          $('.authError').css('display', 'none');
          // document.cookie = data.token;
          // localStorage.setItem('username', username);
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

  forgotPasswordClick(e) {
    $('#modal-signupform').css('display', 'none');
    $('#modal-forgotpassword').css('display', 'block');
    $('#modal-loginform').css('display', 'none');
    $('#forgotpassword-email').focus();
  }

  forgotPasswordSubmit(e) {
    e.preventDefault();
    // ajax, send email + create temporary token (15min) and store in cookie
      // save into a resetPassword table that
    // email contains link to ajax request that grabs cookie token
    // on change password submit, check email with token
    var dataString = $('#forgotPasswordForm').serialize();
    $.ajax({
      type: 'POST',
      url: '/forgotPassword',
      data: dataString,
      success: function(data) {
        // document.cookie = data.token;
        alert('Check your email and follow instructions to reset your password');
        $('.modal').css('display', 'none');
      },
      error: function(err) {
        console.log(err);
      }
    })
  }


  render() {
    return (
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
          <p><a href="/auth/facebook"><img src="../assets/fb.png" width="40%"/></a></p>
          <p className="authError loginError"></p>
          <p><a onClick={this.forgotPasswordClick}>Forgot Password?</a></p>
        </div>
        <div id="modal-signupform">
          <h2 id="formheader">Signup</h2>
          <SignupForm signupFormSubmit={this.signupFormSubmit.bind(this)}/><br/>
          <p className="authError signupError"></p>
          <p>Already have an account? <a onClick={this.modalClickLogin}>Login</a></p>
        </div>
        <div id="modal-forgotpassword">
          <h2 id="formheader">Forgot Password</h2>
            <form id="forgotPasswordForm">
              <div>
                <p>Enter the email associated with your account</p>
                <label>Email: </label>
                <input type="text" name="email" id="forgotpassword-email"/>
              </div>
              <div>
                <input id="submitInput" type="submit" value="Reset Password" onClick={this.forgotPasswordSubmit}/>
              </div>
            </form>
        </div>
        <div>
          <h3> </h3>
        </div>
      </div>
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
