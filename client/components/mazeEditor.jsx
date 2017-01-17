import React from 'react';

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
    <div className="legend">
    <h3>Legend</h3>
      <table className="legend-table">
        <tr className="legend-table-row" onClick={props.clickLegend.bind(this, 1)}>
          <td className="legend-block1" ></td>
          <td className="legend-empty">Empty</td>
        </tr>
        <tr className="legend-table-row" onClick={props.clickLegend.bind(this, 2)}>
          <td className="legend-block2" ></td>
          <td className="legend-block">block</td>
        </tr>
        <tr className="legend-table-row" onClick={props.clickLegend.bind(this, 3)}>
          <td className="legend-block3" ></td>
          <td className="legend-pellet">Pellet</td>
        </tr>
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
    <button className="button" onClick={props.enterMaze}>Enter Maze</button>
    <button className="button" onClick ={props.saveMaze}>Save Maze!</button>
  </div>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
MazeEditor.propTypes = {
  maze: React.PropTypes.array.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default MazeEditor;