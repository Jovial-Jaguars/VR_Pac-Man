var MazeEditor = (props) => (
  <div className= "maze-editor"> 
    <div className="side-bar">
      <h3>Defaults</h3>
      <div className="default1" onClick={props.clickLevel.bind(this, props.def)}>
      {
        props.def.map((curr, indy)=> (
          curr.map((num, index, arr) => {
            if (num === 0) {
              return (<div className="block1" ></div>);
            } else if (num === 1) {
              return (<div className="block2"></div>);
            } else if (num === 2) {
              return (<div className="block3" ></div>);
            }
          }).concat(<br />)
        ))
      }
      </div>
    </div>
    {
      props.maze.map((curr, indy)=> (
        curr.map((num, index, arr) => {
          if (num === 0) {
            return (<div className="element" onDragEnter ={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></div>);
          } else if (num === 1) {
            return (<div className="elemental" onDragEnter ={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></div>);
          } else if (num === 2) {
            return (<div className="dot" onDragEnter={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></div>);
          }
        }).concat(<br></br>)
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