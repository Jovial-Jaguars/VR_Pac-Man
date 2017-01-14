class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      savedMaps: null,
      highScore: null,
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
        <div>Welcome {this.state.username}</div>
        <button id="logout" onClick={this.logout.bind(this)}>Log Out</button>
        <div>
          <button id="mazebuilder" onClick={this.mazebuilderClick}>Maze Builder</button>
          <button id="getmazes" onClick={this.getMazeClick}>Get Mazes Wow</button>
          <button id="multiplayer" onClick={this.multiplayerClick.bind(this)}>Multiplayer Mode</button>
        </div>
      </div>
    )
  }
}

window.ProfilePage = ProfilePage;