class TopNav extends React.Component {
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
    console.log('clicked store')
  }

  navClickAbout() {
    console.log('clicked about')
  }

  render() {
    return (
      <nav>
        <ul id="topnav">
          <li id="topleft">VR Pacman</li>
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