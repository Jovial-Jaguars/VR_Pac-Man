import React from 'react';

var MazeEditor = (props) => (
  <div className= "maze-editor">
    <div className="legend-div">
      <h3 colSpan="2" className="legend-table-header">Legend</h3>
      <div className="legend-table-row" onClick={props.clickLegend.bind(this, 1)}>
        <div className="legend-block1" ></div>
        <div className="legend-empty">Empty</div>
      </div>
      <div className="legend-table-row" onClick={props.clickLegend.bind(this, 2)}>
        <div className="legend-block2" ></div>
        <div className="legend-empty">Block</div>
      </div>
      <div className="legend-table-row" onClick={props.clickLegend.bind(this, 3)}>
        <div className="legend-block3" ></div>
        <div className="legend-empty">Pellet</div>
      </div>
      <div className="legend-table-row" onClick={props.clickLegend.bind(this, 4)}>
        <div className="legend-block4" ></div>
        <div className="legend-empty">Player</div>
      </div>
      <div className="legend-table-row" onClick={props.clickLegend.bind(this, 5)}>
        <div className="legend-block5" ></div>
        <div className="legend-empty">Ghost</div>
      </div>
      <div className="legend-table-row" onClick={props.clickLegend.bind(this, 6)}>
        <div className="legend-block6" ></div>
        <div className="legend-empty">+ve Switch</div>
      </div>
      <div className="legend-table-row" onClick={props.clickLegend.bind(this, 7)}>
        <div className="legend-block7" ></div>
        <div className="legend-empty">-ve Switch</div>
      </div>
      <div className="legend-table-row" onClick={props.clickLegend.bind(this, 8)}>
        <div className="legend-block8" ></div>
        <div className="legend-empty">-ve Switch</div>
      </div>
    </div>
    <div className="maze-editor-table-div">
      {
        props.maze.map((curr, indy)=> (
          <div key={indy*88 + 31}className="maze-editor-row">{
          curr.map((num, index, arr) => {
            if (num === 0) {
              return (<div key={index*100 + indy} className="element" onDragEnter ={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></div>);
            } else if (num === 1) {
              return (<div key={index*100 + indy} className="elemental" onDragEnter ={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></div>);
            } else if (num === 2) {
              return (<div key={index*100 + indy} className="dot" onDragEnter={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></div>);
            } else if (num === 3) {
              return (<div key={index*100 + indy} className="pacman" onDragEnter={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></div>);
            } else if (num === 4) {
              return (<div key={index*100 + indy} className="ghost" onDragEnter={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></div>);
            } else if (num === 5) {
              return (<div key={index*100 + indy} className="up" onDragEnter={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></div>);
            } else if (num === 6) {
              return (<div key={index*100 + indy} className="down" onDragEnter={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></div>);
            } else if (num === 7) {
              return (<div key={index*100 + indy} className="orange" onDragEnter={props.click.bind(this, indy, index)} onMouseDown={props.click.bind(this, indy, index)}></div>);
            }
          })
          }</div>
        ))
      }
    </div>
    <div className="maze-controls">
      <div className="side-bar">
        <h3>My Maps</h3>
        <div className="mazes-list">
        {props.myMaps.map((val, index, arr) => (
          <div key={index*26 + 2222} className="default1" onClick={props.clickMyLevel.bind(this, index)}>
          {
            val.map((curr, indy)=> (
              <div key={indy*666 + 12} className="tablerow">
              {curr.map((num, index, arr) => {
                if (num === 0) {
                  return (<div key={index*56 + indy} className="block1" ></div>);
                } else if (num === 1) {
                  return (<div key={index*56 + indy} className="block2"></div>);
                } else if (num === 2) {
                  return (<div key={index*56 + indy} className="block3" ></div>);
                } else if (num === 3) {
                  return (<div key={index*56 + indy} className="block4"></div>);
                } else if (num === 4) {
                  return (<div key={index*56 + indy} className="block5"></div>);
                } else if (num === 5) {
                  return (<div key={index*56 + indy} className="block6"></div>);
                } else if (num === 6) {
                  return (<div key={index*56 + indy} className="block7"></div>);
                }
              })}
              </div>
            ))
          }
          </div>
        ))}
        <h3>Public Maps</h3>
        {props.publicMaps.map((val, index, arr) => (
          <div key={index*26 + 2555} className="default1" onClick={props.clickPublicLevel.bind(this, index)}>
          {
            val.map((curr, indy)=> (
              <div key={indy*666 + 777} className="tablerow">
              {curr.map((num, index, arr) => {
                if (num === 0) {
                  return (<div key={index*56 + indy + 9999} className="block1" ></div>);
                } else if (num === 1) {
                  return (<div key={index*56 + indy + 9999} className="block2"></div>);
                } else if (num === 2) {
                  return (<div key={index*56 + indy + 9999} className="block3" ></div>);
                } else if (num === 3) {
                  return (<div key={index*56 + indy + 9999} className="block4"></div>);
                } else if (num === 4) {
                  return (<div key={index*56 + indy + 9999} className="block5"></div>);
                } else if (num === 5) {
                  return (<div key={index*56 + indy + 9999} className="block6"></div>);
                } else if (num === 6) {
                  return (<div key={index*56 + indy + 9999} className="block7"></div>);
                }
              })}
              </div>
            ))
          }
          </div>
        ))}
        </div>
      </div>
      <div className="gamepad">
        <button className="button1" onClick={props.enterMaze}>Enter Maze</button>
        <button className="button2" onClick ={props.saveMaze}>Save Maze!</button>
      </div>
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