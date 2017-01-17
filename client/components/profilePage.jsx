class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      savedMaps: null,
      spHighScore: 0,
      mpHighScore: 0
    }
    this.mazebuilderClick = this.mazebuilderClick.bind(this);
  }

  logout() {
    $.ajax({
      type: 'GET',
      url: '/logout',
      success: function() {
        console.log('logged out!');
        this.props.router.push({pathname: '/'});
      }.bind(this)
    })
  }

  componentWillMount() {
    $.ajax({
      type: 'POST',
      url: 'profileInfo',
      data: {user: username},
      success: function(data) {
        console.log('ajax get profile info success');
        console.log('data:', JSON.stringify(data));
        this.setState({
          username: data.user.username
        });
        window.username = data.user.username; //hacky
      }.bind(this)
    });
  }

  mazebuilderClick() {
    this.props.router.push({pathname: '/mazebuilder'});
  }

  getMazeClick() {
    $.ajax({
      type: 'GET',
      url: '/maps',
      success: function(data) {
        console.log('ajax get /maps success');
        console.log('data:', JSON.stringify(data));
      }
    });
  }

  multiplayerClick() {
    console.log('clicked multiplayer mode');
    socket.emit('testing', {user: this.state.username});
    this.props.router.push({pathname: '/multiplayer'})
  }


  render() {
    return (
      <div>
        <TopNav/>
        <div id="profileStats">
          <p id="welcomeMessage">Welcome {this.state.username}</p>
          <p>SP High Score: {this.state.spHighScore}</p>
          <p>MP High Score: {this.state.mpHighScore}</p>
          <button id="logout" onClick={this.logout.bind(this)}>Log Out</button>
          </div>
        <div className="profilePageContent">
          <div className="playScreen">
            <p id="playtext">Play</p>
            <button id="singleplayerBtn">Single Player Mode</button><br/>
            <button id="multiplayerBtn" onClick={this.multiplayerClick.bind(this)}>Multiplayer Mode</button><br/>
            <button id="customGameBtn">Custom Game</button><br/>
            <button id="getmazes" onClick={this.getMazeClick}>Get Mazes Wow</button><br/>
            <br/><a>How To Play</a>
          </div><br/>
          <div className="myMazesScreen">
            <p>My Mazes</p>
            <div>mazes here...</div>
          </div>
        </div>
        <img id="ghostBackgroundPic" src="../assets/pac-man-ghost.png"/>
        <img id="pacmanBackgroundPic" src="../assets/pac-man.png"/>
      </div>
    )
  }
}

window.ProfilePage = ProfilePage;