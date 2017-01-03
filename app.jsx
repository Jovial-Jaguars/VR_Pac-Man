class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      choice: 0,
      maze: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    };
    this.amaze = this.amaze.bind(this);
  }
  amaze() {
    console.log('Fetching pet status...');
    this.setState({
      choice: !this.state.choice
    });

    // fetch('http://localhost:3000/api/pet', {method: 'GET'})
    //   .then(function(parse) {
    //   parse.json()
    //     .then(function (data) {
    // });
  }
  click(num, e) {
    var curr = this.state.maze;
    if (e.target.className === 'element' && curr[num % 16][Math.floor(num / 16)] === 0) {
      e.target.removeAttribute('class');
      e.target.setAttribute('class', 'elemental');
      curr[num % 16][Math.floor(num / 16)] = 1;
    } else if (e.target.className === 'elemental' && curr[num % 16][Math.floor(num / 16)] === 1) {
      e.target.removeAttribute('class');
      e.target.setAttribute('class', 'dot');
      curr[num % 16][Math.floor(num / 16)] = 2;
    } else {
      e.target.removeAttribute('class');
      e.target.setAttribute('class', 'element');
      curr[num % 16][Math.floor(num / 16)] = 0;
    }
    this.setState({
      maze: curr
    });

  }


  render() {
    return (
      <div className="maze">
      { this.state.choice ? 
        <MazeRunner maze={this.state.maze}/>
        : <MazeEditor click={this.click.bind(this)} maze={this.state.maze} amaze={this.amaze.bind(this)}/>
      }
      </div>
    );
  }
}

window.App = App;