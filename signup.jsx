var SignupForm = (props) => (
  <form action="/signup" method="post">
    <div>
      <label>Username:</label>
      <input type="text" name="username"/>
    </div>
    <div>
      <label>Password:</label>
      <input type="text" name="password"/>
    </div>
    <div>
      <input type="submit" value="Sign Up"/>
    </div>
  </form>

);


window.SignupForm = SignupForm;