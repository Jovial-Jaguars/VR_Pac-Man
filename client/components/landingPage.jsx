import React from 'react';
import LoginForm from './login';
import SignupForm from './signup';
import TopNav from './topNav';
import AuthModal from './authModal';
import {Router, Route, browserHistory, Link} from 'react-router';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.mazebuilderClick = this.mazebuilderClick.bind(this);
    this.mazestoreClick = this.mazestoreClick.bind(this);
  }

  modalClickExit() {
    $('.modal').css('display', 'none');
  }

  mazebuilderClick() {
    this.props.router.push({pathname: '/mazebuilder'});
  }

  mazestoreClick() {
    this.props.router.push({pathname: '/mazestore'});
  }

  demoButtonClick(e) {
    // console.log(browserHistory.maze);
    browserHistory.maze = [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
                         [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                         [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                         [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                         [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                         [1, 2, 2, 2, 5, 2, 2, 2, 2, 6, 2, 2, 2, 1, 2, 1],
                         [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
                         [1, 1, 1, 1, 2, 1, 3, 4, 0, 0, 0, 0, 0, 1, 2, 1],
                         [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
                         [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
                         [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
                         [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                         [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                         [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                         [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
                         [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]];

    // var str = '';
    // var arr = [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
    //            [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
    //            [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
    //            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    //            [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
    //            [1, 2, 2, 2, 5, 2, 2, 2, 2, 6, 2, 2, 2, 1, 2, 1],
    //            [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
    //            [1, 1, 1, 1, 2, 1, 3, 4, 0, 0, 0, 0, 0, 1, 2, 1],
    //            [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
    //            [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
    //            [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
    //            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    //            [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
    //            [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
    //            [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    //            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]];
    // for(var i = 0; i < arr.length; i++) {
    //   for(var j =0; j < arr[i].length; j++) {
    //     str = str + arr[i][j];
    //   }
    // }
    // browserHistory.maze = str;
    // browserHistory.maze = [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
    //                  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
    //                  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
    //                  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    //                  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
    //                  [1, 2, 2, 2, 5, 2, 2, 2, 2, 6, 2, 2, 2, 1, 2, 1],
    //                  [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
    //                  [1, 1, 1, 1, 2, 1, 3, 4, 0, 0, 0, 0, 0, 1, 2, 1],
    //                  [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
    //                  [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
    //                  [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
    //                  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    //                  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
    //                  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
    //                  [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    //                  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]]
      window.selectedMaze = browserHistory.maze;
      this.props.router.push({pathname: '/unranked'});
  }

  render() {
    return (
    <div>
      <TopNav router={this.props.router}/>
      <AuthModal router={this.props.router} />
      <div className="landingPageContent">
          <h1 className="headers">Welcome to VR Pacman!</h1>
        <div className="playBtnContent">
          <button id="demobutton" onClick={this.demoButtonClick.bind(this)}><span className="playText">Play</span><br/>Demo Version</button>
          <p>See if you can find the hidden reverse gravity switch before the ghost catches you!</p>
          <p>For multiplayer mode, high scores, custom mazes and more, create a FREE account!</p>
        </div>
        <h1 className="headers">How to Play:</h1>
        <p>VR: Insert mobile phone into a VR headset. Align to center. Look around to change your direction! Collect the pellets while avoiding the ghosts!<br/>
          PC: Click and drag to change your direction! Collect the pellets while avoiding the ghosts!
        </p>
        <p className="legalnotice">Legal notice: This website is not related or endorsed by the registered trademark owners Namco, Inc.<br/>
          Background Pacman and ghost icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> and <a href="http://www.flaticon.com/authors/tutsplus" title="TutsPlus">TutsPlus</a> respectively and is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
      </div>
      <img id="ghostBackgroundPic" src="../assets/pac-man-ghost.png"/>
      <img id="pacmanBackgroundPic" src="../assets/pac-man.png"/>
    </div>
    );
  }
}
