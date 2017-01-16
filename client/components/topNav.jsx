class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  navClickHome() {
    console.log('clicked home')
  }

  navClickMazeBuilder() {
    console.log('clicked mazebuilder')
  }

  navClickStore() {
    console.log('clicked store')
  }

  navClickAbout() {
    console.log('clicked about')
  }

  render() {
    return (
      <nav id="topnav">
        <ul>
          <li id="nav-home" onClick={this.navClickHome}>Home</li>
          <li onClick={this.navClickMazeBuilder}>MazeBuilder</li>
          <li onClick={this.navClickStore}>Store</li>
          <li onClick={this.navClickAbout}>About</li>
        </ul>
      </nav>
      );
  }
}