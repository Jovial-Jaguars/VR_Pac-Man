var MazeEditor = (props) => (
  <div> 
    {
      props.maze.map((curr, indy)=> (
        curr.map((num, index, arr) => (<div className="element" onClick={props.click.bind(this, indy * arr.length + index)}></div>)).concat(<br></br>)
      ))
    }
    <button onClick={props.amaze}>Maze</button>
  </div> 
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
MazeEditor.propTypes = {
  maze: React.PropTypes.array.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
window.MazeEditor = MazeEditor;