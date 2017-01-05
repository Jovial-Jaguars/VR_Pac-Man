var MazeEditor = (props) => (
  <div className= "maze-editor"> 
    <div className="side-bar">
      <h3>Defaults</h3>
      <table className="default1" onClick={props.clickLevel.bind(this, props.def)}>
      
      {
        props.def.map((curr, indy)=> (
          <tr className="tablerow">
          {curr.map((num, index, arr) => {
            if (num === 0) {
              return (<td className="block1" ></td>);
            } else if (num === 1) {
              return (<td className="block2"></td>);
            } else if (num === 2) {
              return (<td className="block3" ></td>);
            } else if (num === 3) {
              return (<td className="block4"></td>);
            } 
          })}
          </tr>
        ))
      }

      </table>
    </div>
    <table className="maze-editor-table">
    {
      props.maze.map((curr, indy)=> (
        <tr className="maze-editor-row">{
        curr.map((num, index, arr) => {
          if (num === 0) {
            return (<td className="element" onDragEnter ={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></td>);
          } else if (num === 1) {
            return (<td className="elemental" onDragEnter ={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></td>);
          } else if (num === 2) {
            return (<td className="dot" onDragEnter={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></td>);
          } else if (num === 3) {
            return (<td className="pacman" onDragEnter={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></td>);
          }
        })
        }</tr>
      ))
    }
    </table>
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