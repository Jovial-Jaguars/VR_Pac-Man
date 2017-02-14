import React from 'react';
import TopNav from './topNav';
import MyProfileMaps from './myprofilemaps';
import {Router, Route, browserHistory, Link, withRouter} from 'react-router';


export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myMaps: [],
      username: null,
      savedMaps: null,
      spHighScore: null,
      mpHighScore: null
    }
    this.mazebuilderClick = this.mazebuilderClick.bind(this);
    this.mazestoreClick = this.mazestoreClick.bind(this);
    this.convertArray = this.convertArray.bind(this);
    this.convertData = this.convertData.bind(this);
  }

  componentWillMount() {
    this.getMyMazes();
    window.selectedMaze = null;
  }

  mazebuilderClick() {
    this.props.router.push({pathname: '/mazebuilder'});
  }
  mazestoreClick() {
    this.props.router.push({pathname: '/mazestore'});
  }


  convertData (data, strName) {
     var that = this;
     var arrayMaps = [];
     //var obj = {};
     for (var i = 0; i < data.length ; i++){
        var tempArray =[]
        tempArray.push(that.convertArray(data[i]['mapData']));
        tempArray.push(data[i]['id']);
        tempArray.push(data[i]['shareable']);
        tempArray.push(data[i]['user_id']);
        arrayMaps.push(tempArray);
     }
     //obj[strName] = arrayMaps;
     this.setState({[strName] : arrayMaps});
     console.log('arrayMaps',arrayMaps);
  }

  //converts the map string into an array of row arrays
  convertArray (string) {
    var oneMap = [];
    var oneArray = [];
    if (string) {
      for (var i = 0; string.length > i; i++){
        oneArray.push(Number(string[i]));
        if ((i+1) % 16 === 0){
          oneMap.push(oneArray.slice());
          oneArray = [];
        }
      }
    }
    return oneMap;
  }

  getMyMazes() {
    var that = this;
    console.log('test', localStorage.getItem('username'))
    $.ajax({
      type: 'GET',
      url: '/maps',
      data: {username: localStorage.getItem('username'), token: document.cookie},
      success: function(data) {
        if (data[1]) {
          // console.log('success myMaps', that.convertData(data[1], 'myMaps'));
        }
      }
    });
  }

  multiplayerClick() {
    this.props.router.push({pathname: '/multiplayerRanked'})
  }

  singlePlayerClick() {
    this.props.router.push({pathname: '/ranked'})
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
    window.customMode = 'multiplayer'
  }

  customSinglePlayerClick() {
    // $('#multiplayerSelected').css('display', 'none');
    $('#multiplayerSelected').slideUp("fast");
    $('#mpModeButton').css('box-shadow', 'none');
    $('#spModeButton').css('box-shadow', 'inset 0 0 0 1px #27496d,inset 0 5px 30px #193047');
    window.customMode = 'singleplayer'
  }

  customGamePlayButtonClick() {

    var roomMode, roomName, roomSuccess = null;

    var hasValue = function(elem) {
      return $(elem).filter(function() {
        return $(this).val(); }).length > 0;
    };
    if (hasValue($('#joinRoom')) && hasValue($('#createRoom'))) {
      roomName = null;
    } else if (hasValue($('#joinRoom'))) {
      roomName = $('#joinRoom').val();
      roomMode = 'join';
    } else if (hasValue($('#createRoom'))) {
      roomName = $('#createRoom').val();
      roomMode = 'create';
    }

    console.log('roomname', roomName);
    console.log(window.customMode);
    // if multiplayer..
      // if creating room and room doesn't exist, create
      // if creating room and room exists, send error
      // if joining room and room doesn't exist, send error
      // if joining room and room exists, join
    if (window.customMode === 'multiplayer') {
      if (roomMode === 'create') {
        $.ajax({
          type: 'POST',
          url: '/createCustomRoom',
          async: false,
          data: {room: roomName},
          success: function(data) {
            if (data === 'created') {
              roomSuccess = true;
              console.log('room created');
            } else if (data === 'taken') {
              roomSuccess = false;
              console.log('room taken');
            }
          },
          error: function() {
            console.log('error creating room');
          }
        })
      } else if (roomMode === 'join') {
        $.ajax({
          type: 'GET',
          url: '/joinCustomRoom',
          async: false,
          data: {room: roomName},
          success: function(data) {
            if (data === 'not found') {
              roomSuccess = false;
              console.log('room not found')
            } else if (data === 'joined') {
              roomSuccess = true;
              console.log('room joined');
            } else if (data === 'room full') {
              roomSuccess = false;
              console.log('room full');
            }
          },
          error: function() {
            console.log('error joining room');
          }
        })
      }
      window.room = roomName;
      console.log('room joined/created', room);
      // if conditions are all met, join socket room and enter game
      if (roomSuccess && window.selectedMaze) {
        socket.emit('join', room);
        //
        // this.props.router.push({pathname: '/multiplayerCustom'})
      }
    }

    if (window.customMode === 'singleplayer') {
      if (window.selectedMaze) {
        // router push /singlelayerCustom
        ///////////////////////////////////*******************
        window.selectedMaze;
        this.props.router.push({pathname: '/unranked'})

      }
    }

  }

  modalClickExit() {
    $('.modal').css('display', 'none');
    $('.howToPlayModal').css('display', 'none');
  }

  howToPlayClick() {
    $('.howToPlayModal').css('display', 'block');
  }

  render() {
    console.log('mymaps:',this.state.myMaps);
    return (
      <div>
        <TopNav router={this.props.router}/>
        <div className="profilePageContent">
          <div className="playScreen">
            <h1 className="headers">Play</h1>
            <button id="singleplayerBtn" onClick={this.singlePlayerClick.bind(this)}>Single Player</button><br/>
            <button id="multiplayerBtn" onClick={this.multiplayerClick.bind(this)}>Multiplayer</button><br/>
            <button id="customGameBtn" onClick={this.customGameClick}>Custom Game</button><br/>
            <br/><a onClick={this.howToPlayClick}>How To Play</a>
          </div><br/>
          <div className="myMazesScreen">
            <h1 className="headers ">My Mazes</h1>
            <div className="profilemaps-container">{this.state.myMaps.map((singleMap, index)=><MyProfileMaps key={index} mapId={index} singleMap={singleMap}/>)}</div>
          </div>
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
              <span>Join a room:&nbsp;<input type="text" id="joinRoom"/></span>
              <span>OR</span>
              <span>Create a Room:&nbsp;<input type="text" id="createRoom"/></span>
            </div>
            <div id="customMazeSelection">
              <p className="customGameHeaders">Choose a maze:</p>
              <div className="profilemaps-container">{this.state.myMaps.map((singleMap, index)=><MyProfileMaps key={index} mapId={index} singleMap={singleMap}/>)}</div>
            </div>
            <button id="customGamePlayButton" onClick={this.customGamePlayButtonClick.bind(this)}>Play</button>
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