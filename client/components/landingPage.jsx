class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.mazebuilderClick = this.mazebuilderClick.bind(this);
  }

  navClickHome() {
  }

  modalClickLogin() {
    $('.modal').css('display', 'block');
    $('#modal-signupform').css('display', 'none');
    $('#modal-loginform').css('display', 'block');
  }

  modalClickSignup() {
    $('.modal').css('display', 'block');
    $('#modal-loginform').css('display', 'none');
    $('#modal-signupform').css('display', 'block');
  }

  modalClickExit() {
    $('.modal').css('display', 'none');
  }

  mazebuilderClick() {
    this.props.router.push({pathname: '/mazebuilder'});
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
        console.log('successfully signed up!');
        window.username = username;
        this.props.router.push({pathname: '/profile'});
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
      success: function() {
        console.log('successfully logged in!');
        window.username = username;
        this.props.router.push({pathname: '/profile'});
      }.bind(this)
    })
  }

  render() {
    return (
    <div>
      <nav>
        <button id="nav-home" onClick={this.navClickHome.bind(this)}>Home</button>
        <button id="nav-login" onClick={this.modalClickLogin}>Login</button>
        <button id="nav-signup" onClick={this.modalClickSignup}>Signup</button>
      </nav>
      <div>
        <button id="mazebuilder" onClick={this.mazebuilderClick}>Maze Builder</button>
      </div>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <button id="modal-login" onClick={this.modalClickLogin}>Login</button>
            <button id="modal-signup" onClick={this.modalClickSignup}>Signup</button>
            <span className="close" onClick={this.modalClickExit}>&times;</span>
          </div>
          <div id="modal-loginform">
            <p>Login</p>
            <LoginForm loginFormSubmit={this.loginFormSubmit.bind(this)}/>
          </div>
          <div id="modal-signupform">
            <p>Signup</p>
            <SignupForm signupFormSubmit={this.signupFormSubmit.bind(this)}/>
            <p>Already have an account?<a>Login</a></p>
          </div>
          <div className="modal-footer">
            <h3> </h3>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

window.onclick = function(event) {
  var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

window.LandingPage = LandingPage;