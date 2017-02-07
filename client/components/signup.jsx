import React from 'react';

var SignupForm = (props) => (
  <form id="signupForm">
    <div>
      <label>Username: </label>
      <input type="text" name="username" id="signup-username"/>
    </div>
    <div>
      <label>Email: </label>
      <input type="text" name="email"/>
    </div>

    <div>
      <label>Password: </label>
      <input type="password" name="password"/>
    </div>
    <div>
      <input id="submitInput" type="submit" value="Sign Up" onClick={props.signupFormSubmit}/>
    </div>
  </form>

);


export default SignupForm;