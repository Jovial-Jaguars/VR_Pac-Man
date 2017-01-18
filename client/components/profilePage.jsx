import React from 'react';
import TopNav from './topNav';

export default class ProfilePage extends React.Component {
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
    this.getMyMazes();
  }

  mazebuilderClick() {
    this.props.router.push({pathname: '/mazebuilder'});
  }

  getMyMazes() {
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
    socket.emit('testing', {user: this.state.username});
    this.props.router.push({pathname: '/multiplayer'})
  }

  singlePlayerClick() {
    this.props.router.push({pathname: '/singleplayer'})
  }

  customGameClick() {
    $('.modal').css('display', 'block');
  }

  customMultiplayerClick() {
    $('#multiplayerSelected').css('display', 'flex');
  }

  customSinglePlayerClick() {
    $('#multiplayerSelected').css('display', 'none');
  }

  modalClickExit() {
    $('.modal').css('display', 'none');
  }

  render() {
    return (
      <div>
        <TopNav router={this.props.router}/>
        <div id="profileStats">
          <p id="welcomeMessage">Welcome {this.state.username}</p>
          <p>SP High Score: {this.state.spHighScore}</p>
          <p>MP High Score: {this.state.mpHighScore}</p>
          <button id="logout" onClick={this.logout.bind(this)}>Log Out</button>
        </div>
        <div className="profilePageContent">
          <div className="playScreen">
            <h1 className="headers">Play</h1>
            <button id="singleplayerBtn" onClick={this.singlePlayerClick.bind(this)}>Single Player</button><br/>
            <button id="multiplayerBtn" onClick={this.multiplayerClick.bind(this)}>Multiplayer</button><br/>
            <button id="customGameBtn" onClick={this.customGameClick}>Custom Game</button><br/>
            <br/><a>How To Play</a>
          </div><br/>
          <div className="myMazesScreen">
            <h1 className="headers">My Mazes</h1>
            <div>mazes here...</div>
          </div>
        </div>
        <div id="myModal" className="modal">
          <div className="modal-content custom">
            <div className="customGameModalHeader">
              <span id="customGametext">Custom Game</span>
            </div>
            <span id="customGameModalClose" className="close" onClick={this.modalClickExit}>&times;</span>
            <p className="customGameHeaders">Select a mode:</p>
            <div className="customGameModeFlexContainer">
              <button onClick={this.customSinglePlayerClick}>Single Player</button>
              <button onClick={this.customMultiplayerClick}>Multiplayer</button>
            </div>
            <div id="multiplayerSelected">
              <span>Join a room:&nbsp;<input type="text"/></span>
              <span>OR</span>
              <span>Create a Room:&nbsp;<input type="text"/></span>
            </div>
            <div id="customMazeSelection">
              <p className="customGameHeaders">Choose a maze:</p>
              <br/>mazes here...
            </div>
          </div>
        </div>
        <img id="ghostBackgroundPic" src="../assets/pac-man-ghost.png"/>
        <img id="pacmanBackgroundPic" src="../assets/pac-man.png"/>
      </div>
    )
  }
}
