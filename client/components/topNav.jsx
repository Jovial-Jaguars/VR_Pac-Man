import React from 'react';

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  navClickHome() {
    console.log('clicked home')
    this.props.router.push({pathname: '/'});
  }

  navClickMazeBuilder() {
    this.props.router.push({pathname: '/mazebuilder'});
  }

  navClickStore() {
    this.props.router.push({pathname: '/mazestore'});
    console.log('clicked store')
    this.props.router.push({pathname: '/mazestore'});
  }

  navClickAbout() {
    // this.props.router.push({pathname: '/about'});
    this.props.router.push({pathname: '/resetpassword'});
  }

  render() {
    return (
      <nav>
        <ul id="topnav">
          <li id="topleft"></li>
          <li id="nav-home" onClick={this.navClickHome.bind(this)}>Home</li>
          <li onClick={this.navClickMazeBuilder.bind(this)}>MazeBuilder</li>
          <li onClick={this.navClickStore.bind(this)}>Store</li>
          <li onClick={this.navClickAbout.bind(this)}>About</li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </nav>
      );
  }
}