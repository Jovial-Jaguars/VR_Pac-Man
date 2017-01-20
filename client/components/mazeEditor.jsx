import React from 'react';

var MazeEditor = (props) => (
  <div className= "maze-editor">
    <div className="legend-div">
        <table className="legend">
         <thead className="legend-table-head">
          <tr className="legend-table-head-row">
             <th className="legend-table-header">Legend</th>
          </tr>
         </thead>
         <tbody className="legend-table-body">
          <tr className="legend-table-row" onClick={props.clickLegend.bind(this, 1)}>
            <td className="legend-block1" ></td>
            <td className="legend-empty">Empty</td>
          </tr>
          <tr className="legend-table-row" onClick={props.clickLegend.bind(this, 2)}>
            <td className="legend-block2" ></td>
            <td className="legend-empty">Block</td>
          </tr>
          <tr className="legend-table-row" onClick={props.clickLegend.bind(this, 3)}>
            <td className="legend-block3" ></td>
            <td className="legend-empty">Pellet</td>
          </tr>
          <tr className="legend-table-row" onClick={props.clickLegend.bind(this, 4)}>
            <td className="legend-block4" ></td>
            <td className="legend-empty">Player</td>
          </tr>
          <tr className="legend-table-row" onClick={props.clickLegend.bind(this, 5)}>
            <td className="legend-block5" ></td>
            <td className="legend-empty">Ghost</td>
          </tr>
          <tr className="legend-table-row" onClick={props.clickLegend.bind(this, 6)}>
            <td className="legend-block6" ></td>
            <td className="legend-empty">Positive Gravity Switch</td>
          </tr>
          <tr className="legend-table-row" onClick={props.clickLegend.bind(this, 7)}>
            <td className="legend-block7" ></td>
            <td className="legend-empty">Neagtive Gravity Switch</td>
          </tr>
          </tbody>
        </table>
    </div>
    <div className="maze-editor-table-div">
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
            } else if (num === 4) {
              return (<td className="ghost" onDragEnter={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></td>);
            } else if (num === 5) {
              return (<td className="up" onDragEnter={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></td>);
            } else if (num === 6) {
              return (<td className="down" onDragEnter={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></td>);
            }
          })
          }</tr>
        ))
      }
      </table>
    </div>
    <div className="side-bar">
      <h3>Defaults</h3>
      {props.mazes.map((val, index, arr) => (
        <table className="default1" onClick={props.clickLevel.bind(this, index)}>
        {
          val.map((curr, indy)=> (
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
              } else if (num === 4) {
                return (<td className="block5"></td>);
              } else if (num === 5) {
                return (<td className="block6"></td>);
              } else if (num === 6) {
                return (<td className="block7"></td>);
              }
            })}
            </tr>
          ))
        }
        <br></br><br></br>
        </table>
      ))}
    </div>
    <div className="gamepad">
      <button className="button1" onClick={props.enterMaze}>Enter Maze</button>
      <button className="button2" onClick ={props.saveMaze}>Save Maze!</button>
    </div>
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