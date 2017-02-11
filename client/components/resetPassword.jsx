import React from 'react';
import TopNav from './topNav';
import {Router, Route, browserHistory, Link} from 'react-router';

// var ChangePassword = (props) => (
//   <div>
//     <TopNav router={Router}/>
//     <div className="changePasswordContent">
//       <form id="loginForm">
//         <div>
//           <label>Username: </label>
//           <input type="text" name="username" id="login-username"/>
//         </div>
//         <div>
//           <label>New Password: </label>
//           <input type="password" name="password"/>
//         </div>
//         <div>
//           <label>Re-type New Password: </label>
//           <input type="password" name="password"/>
//         </div>
//         <div>
//           <input id="submitInput" type="submit" value="Change Password" onClick={}/>
//         </div>
//       </form>
//         </div>
//   </div>

// );


// export default ChangePassword;

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
  }

  resetPasswordClick(e) {
    e.preventDefault();
    console.log('hit');
  }

  render() {
    return (
    <div>
    <TopNav router={this.props.router}/>
      <div className="resetPasswordContent">
        <div className="headers">Reset Password</div>
        <form id="ResetPasswordForm">
          <div>
            <label>Email: </label>
            <input type="text" name="email"/>
          </div>
          <div>
            <label>New Password: </label>
            <input type="password" name="password"/>
          </div>
          <div>
            <label>Retype Password: </label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input id="submitInput" type="submit" value="Reset Password" onClick={this.resetPasswordClick}/>
          </div>
        </form>
      </div>
    </div>
    );
  }
}