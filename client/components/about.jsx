import React from 'react';
import TopNav from './topNav';
import AuthModal from './authModal';

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }

  randomizeCreatorsOrder() {
    var creators = ['wells', 'humaid', 'don'];
    var randomized = [];
    var randIdx = function(creators) {
      return Math.floor(Math.random()*creators.length);
    }
    var len = creators.length;
    for (var i = 0; i < len; i++) {
      randomized.push(creators.splice(randIdx(creators),1));
    }
    for (var i = 0; i < randomized.length; i++) {
      var id = '#creatorsSlot' + (i + 1);
      if (randomized[i][0] === 'wells') {
        $(id).html("<img id='creatorPics' src='../assets/Wells.JPG'/>Wells Tsai<br/><a target='_blank' href='https://www.linkedin.com/in/wells-tsai'><img id='linkedInIcon' src='../assets/linkedin.png'/></a><a target='_blank' href='https://github.com/wellstsai'><img id='gitIcon' src='../assets/git.png'/></a>");
      } else if (randomized[i][0] === 'humaid') {
        $(id).html("<img id='creatorPics' src='../assets/Humaid.JPG'/>Humaid Khan<br/><a target='_blank' href='https://www.linkedin.com/in/humaidk2'><img id='linkedInIcon' src='../assets/linkedin.png'/></a><a target='_blank' href='https://github.com/humaidk2'><img id='gitIcon' src='../assets/git.png'/></a>")
      } else if (randomized[i][0] === 'don') {
        $(id).html("<img id='creatorPics' src='../assets/Don.JPG'/>Don Nguyen<br/><a target='_blank' href='http://www.google.com'><img id='linkedInIcon' src='../assets/linkedin.png'/></a><a target='_blank' href='https://github.com/nguyendkim'><img id='gitIcon' src='../assets/git.png'/></a>")
      }
    }
    return randomized;
  }

  componentWillMount() {
    this.props.router.setRouteLeaveHook(
        this.props.route,
        this.routerWillLeave
      )
  }

  componentDidMount() {
    this.randomizeCreatorsOrder();
  }

  routerWillLeave() {
  }

  submitScore() {
    $.ajax({
      type: 'POST',
      url: '/submitScore',
      data: {table: 'spHighScores_VR', score: 9},
      success: function(data) {
        console.log(data);
        $.ajax({
          type: 'POST',
          url: '/updateMyHighScores',
          data: {table: 'spHighScores_VR', score: 9},
          success: function(data) {
            console.log(data);
          }
        })
      }
    })
  }

  showScores() {
    $.ajax({
      type: 'GET',
      url: '/highScoreTable',
      data: {table: 'spHighScores_PC'},
      success: function(scores) {
        console.log(JSON.stringify(scores));
      }
    })
  }

  render() {
    return(
    <div id="aboutPage">
      <TopNav router={this.props.router}/>
      <AuthModal router={this.props.router} />
      <div className="aboutPageContent">
        <h1 className="headers">The Game</h1>
        <p>VR Pacman is a virtual reality spin on the classic 1980s Pac-man game by Namco. In VR Pacman, you become the Pac-man in this first-person maze traversing game. Users can compete in ranked games or play in custom private games with their friends. They can also design or purchase their own virtual reality mazes and share them to the world. This game is meant for both mobile (virtual reality) and Desktop (360 degree camera).</p>
        <p>The game was built using the BabylonJS library on top of a React, Node, Express, MySQL/Sequelize stack.</p>
        <h1 className="headers">The Creators</h1>
        <p>We are a team of 3 software engineers excited about VR and web development.</p>
        <div className="creatorsFlexBox">
          <div id="creatorsSlot1">
          </div>
          <div id="creatorsSlot2">
          </div>
          <div id="creatorsSlot3">
          </div>
        </div>
        <p>Contact us at&nbsp;<a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=contact@VRpacman.com">contact@VRpacman.com</a></p>
      </div>
      <img id="ghostBackgroundPic" src="../assets/pac-man-ghost.png"/>
      <img id="pacmanBackgroundPic" src="../assets/pac-man.png"/>
    </div>
    )
  }

}