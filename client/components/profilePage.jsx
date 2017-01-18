import React from 'react';
import TopNav from './topNav';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      savedMaps: null,
      spHighScore: null,
      mpHighScore: null
    }
    this.mazebuilderClick = this.mazebuilderClick.bind(this);
    this.mazestoreClick = this.mazestoreClick.bind(this);
  }

  logout() {
    $.ajax({
      type: 'GET',
      url: '/logout',
      success: function() {
        console.log('logged out!');
        window.username = null;
        this.props.router.push({pathname: '/'});
      }.bind(this)
    })
  }

  componentWillMount() {
    $.ajax({
      type: 'POST',
      url: 'profileInfo',
      data: {user: username},
      async: false,
      success: function(data) {
        if (!data.username) {
          // console.log('compwillmount profpage data', data);
          alert('Authentication error');
          this.props.router.push({pathname: '/'});
        } else {
          console.log('reset high scores state');
          console.log(data);
          window.username = data.username;
          this.setState({
            username: data.username,
            spHighScore: data.spHighScores_VR,
            mpHighScore: data.mpHighScores_VR
          });
        }
      }.bind(this)
    });
    this.getMyMazes();
  }

  mazebuilderClick() {
    this.props.router.push({pathname: '/mazebuilder'});
  }
  mazestoreClick() {
    this.props.router.push({pathname: '/mazestore'});
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
    // $('#multiplayerSelected').css('display', 'flex');
    $('#multiplayerSelected').slideDown("fast");
    var toggle = false;
    $('#spModeButton').css('box-shadow', 'none');
    $('#mpModeButton').css('box-shadow', 'inset 0 0 0 1px #27496d,inset 0 5px 30px #193047');
  }

  customSinglePlayerClick() {
    // $('#multiplayerSelected').css('display', 'none');
    $('#multiplayerSelected').slideUp("fast");
    $('#mpModeButton').css('box-shadow', 'none');
    $('#spModeButton').css('box-shadow', 'inset 0 0 0 1px #27496d,inset 0 5px 30px #193047');
  }

  modalClickExit() {
    $('.modal').css('display', 'none');
    $('.howToPlayModal').css('display', 'none');
  }

  howToPlayClick() {
    $('.howToPlayModal').css('display', 'block');
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
            <br/><a onClick={this.howToPlayClick}>How To Play</a>
          </div><br/>
          <div className="myMazesScreen">
            <h1 className="headers">My Mazes</h1>
            <div>mazes here...</div>
          </div>
        </div>  
        <div>Welcome {this.state.username}</div>
        <button id="logout" onClick={this.logout.bind(this)}>Log Out</button>
        <div>
          <button id="mazebuilder" onClick={this.mazebuilderClick}>Maze Builder</button>
          <button id="getmazes" onClick={this.getMazeClick}>Get Mazes Wow</button>
          <button id="mazestore" onClick={this.mazestoreClick}>MazeStore</button>
        </div>
        <div id="customModal" className="modal">
          <div className="modal-content custom">
            <div className="customGameModalHeader">
              <span id="customGametext">Custom Game</span>
            </div>
            <span id="customGameModalClose" className="close" onClick={this.modalClickExit}>&times;</span>
            <p className="customGameHeaders">Select a mode:</p>
            <div className="customGameModeFlexContainer">
              <button id="spModeButton" onClick={this.customSinglePlayerClick}>Single Player</button>
              <button id="mpModeButton" onClick={this.customMultiplayerClick}>Multiplayer</button>
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
        <div id="htpModal" className="howToPlayModal">
          <div className="modal-content htp">
            <div className="howToPlayModalHeader">
              <span id="howToPlaytext">How to Play</span>
            </div>
            <span id="customGameModalClose" className="close" onClick={this.modalClickExit}>&times;</span>
            <p>VR: Insert mobile phone into a VR headset. Align to center. Look around to change your direction! Collect the pellets while avoiding the ghosts!<br/>
                PC: Click and drag to change your direction! Collect the pellets while avoiding the ghosts!</p>
          </div>
        </div>
        <img id="ghostBackgroundPic" src="../assets/pac-man-ghost.png"/>
        <img id="pacmanBackgroundPic" src="../assets/pac-man.png"/>
      </div>
    )
  }
}