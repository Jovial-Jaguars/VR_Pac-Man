class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      savedMaps: null,
      highScore: null,
    }
  }

  render() {
    return (
      <div>Welcome UserNameHere</div>
    )
  }
}

window.ProfilePage = ProfilePage;