import React from 'react';
import TopNav from './topNav';

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
    console.log(JSON.stringify(randomized));
    return randomized;
  }

  componentWillMount() {
    this.randomizeCreatorsOrder();
  }

  render() {
    return(
    <div>
      <TopNav router={this.props.router}/>
      <div className="aboutPageContent">
        <h1 className="headers">The Game</h1>
        <p>VR Pacman is a spin on the classic 1980s Pac-man game by Namco. In VR Pacman, you become the Pac-man in this first-person maze traversing game. Users can play in different game modes, as well as compete online or play private games with their friends. They can also design or purchase their own virtual reality mazes and play in them. This game is meant for both virtual reality and PC.</p>
        <p>The game was built using the BabylonJS library on top of a React, Node, Express, MySQL/Sequelize stack.</p>
        <h1 className="headers">The Creators</h1>
        <p>We are a team of 3 software engineers excited about VR and web development.</p>
        <div className="creatorsFlexBox">
          <div><img id="creatorPics" src="../assets/Wells.jpg"/>
                Wells Tsai<br/>
                <a target="_blank" href="https://www.linkedin.com/in/wells-tsai">
                  <img id="linkedInIcon" src="../assets/linkedin.png"/></a>
                <a target="_blank" href="https://github.com/wellstsai">
                <img id="gitIcon" src="../assets/git.png"/></a>
          </div>
          <div><img id="creatorPics" src="../assets/Humaid.jpg"/>Humaid Khan<br/>
                <a target="_blank" href="https://www.linkedin.com/in/humaidk2">
                  <img id="linkedInIcon" src="../assets/linkedin.png"/></a>
                <a target="_blank" href="https://github.com/humaidk2">
                <img id="gitIcon" src="../assets/git.png"/></a>
          </div>
          <div><img id="creatorPics" src="../assets/Don.jpg"/>Don Nguyen<br/>
                <a target="_blank" href="http://www.google.com">
                  <img id="linkedInIcon" src="../assets/linkedin.png"/></a>
                <a target="_blank" href="https://github.com/nguyendkim">
                <img id="gitIcon" src="../assets/git.png"/></a>
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