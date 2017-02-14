import React from 'react';
import TopNav from './topNav';
import {Router, Route, browserHistory, Link} from 'react-router';


export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
  }

  resetPasswordClick(e) {
    e.preventDefault();
    $('#resetPasswordForm .resetPasswordError').css('display', 'none');
    console.log('pw1:', $('#resetPasswordForm .password').val());
    console.log('pw2:', $('#resetPasswordForm .retypePassword').val());

    var formData = $('#resetPasswordForm').serialize();
    // if password's don't match, show error message
    if ($('#resetPasswordForm .password').val() !== $('#resetPasswordForm .retypePassword').val()) {
      $('#resetPasswordForm .password').val('');
      $('#resetPasswordForm .retypePassword').val('');
      $('#resetPasswordForm .resetPasswordError').css('display', 'block');
      $('#resetPasswordForm .resetPasswordError').text('Passwords do not match, try again')
    } else {
      var email = $('#resetPasswordForm input[type=text]').val();
      var password = $('#resetPasswordForm .password').val();
      // ajax to update password
      $.ajax({
        type: 'POST',
        url: '/resetpassword',
        data: {email: email, password: password},
        success: function() {
          alert('Successfully updated password! You can now log in using updated credentials.')
          this.props.router.push({pathname: '/'});
        }.bind(this),
        error: function() {
          alert('There was an error in updating your credentials. Please try again.');
          this.props.router.push({pathname: '/'});
        }.bind(this)
      })
    }

  }

  render() {
    return (
    <div>
    <TopNav router={this.props.router}/>
      <div className="resetPasswordContent">
        <div className="headers">Reset Password</div>
        <form id="resetPasswordForm">
          <div>
            <label>Email: </label>
            <input type="text" name="email"/>
          </div>
          <div>
            <label>New Password: </label>
            <input className="password" type="password" name="password"/>
          </div>
          <div>
            <label>Retype Password: </label>
            <input className="retypePassword" type="password" name="password"/>
          </div>
          <div>
            <input id="submitInput" type="submit" value="Reset Password" onClick={this.resetPasswordClick}/>
          </div>
          <p className="resetPasswordError"></p>
        </form>
      </div>
    </div>
    );
  }
}