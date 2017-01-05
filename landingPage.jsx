class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.mazebuilderClick = this.mazebuilderClick.bind(this);
  }

  navClickHome() {
    console.log('clicked home');
  }

  modalClickLogin() {
    console.log('clicked login');
    $('.modal').css('display', 'block');
    $('#modal-signupform').css('display', 'none');
    $('#modal-loginform').css('display', 'block');
  }

  modalClickSignup() {
    console.log('clicked signup');
    $('.modal').css('display', 'block');
    $('#modal-loginform').css('display', 'none');
    $('#modal-signupform').css('display', 'block');
  }

  modalClickExit() {
    console.log('clicked exit');
    $('.modal').css('display', 'none');
  }

  mazebuilderClick() {
    this.props.router.push({pathname: '/mazebuilder'});
  }

  render() {
    return (
    <div>
      <nav>
        <button id="nav-home" onClick={this.navClickHome}>Home</button>
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
            <LoginForm/>
          </div>
          <div id="modal-signupform">
            <p>Signup</p>
            <SignupForm/>
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

window.LandingPage = LandingPage;