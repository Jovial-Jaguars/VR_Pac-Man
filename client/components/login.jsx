import React from 'react';

var LoginForm = (props) => (
  <form id="loginForm">
    <div>
      <label>Username: </label>
      <input type="text" name="username" id="login-username"/>
    </div>
    <div>
      <label>Password: </label>
      <input type="text" name="password"/>
    </div>
    <div>
      <input id="submitInput" type="submit" value="Log In" onClick={props.loginFormSubmit}/>
    </div>
  </form>

);


export default LoginForm;