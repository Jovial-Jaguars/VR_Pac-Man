import React from 'react';
import MazeRunner from './mazeRunner';
import MazeEditor from './mazeEditor';
import {Router, Route, browserHistory, Link} from 'react-router';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pacFlag: 0,
      choice: 0,
      legend: 0,
      publicMaps: 5,
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
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],

      default1: [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                 [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 3, 0, 0, 0, 0, 0, 0, 1, 2, 1],
                 [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
                 [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]],

      myMaps:    [[[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                 [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 3, 0, 0, 0, 0, 0, 0, 1, 2, 1],
                 [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
                 [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]],

                 [[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                 [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
                 [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
                 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                 [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 3, 0, 0, 0, 0, 0, 0, 1, 2, 1],
                 [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
                 [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]],

                 [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
                 [0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0],
                 [0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0],
                 [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
                 [0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0],
                 [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 0],
                 [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                 [0, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                 [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                 [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                 [0, 0, 0, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]]],

      publicMaps:    [[[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                 [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 3, 0, 0, 0, 0, 0, 0, 1, 2, 1],
                 [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
                 [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]],

                 [[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                 [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
                 [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
                 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                 [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 3, 0, 0, 0, 0, 0, 0, 1, 2, 1],
                 [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
                 [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]],

                 [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
                 [0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0],
                 [0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0],
                 [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
                 [0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0],
                 [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 0],
                 [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                 [0, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                 [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                 [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                 [0, 0, 0, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]]]

    };
    this.enterMaze = this.enterMaze.bind(this);
    this.clickLevel = this.clickLevel.bind(this);
    this.clickLegend = this.clickLegend.bind(this);
    this.convertData = this.convertData.bind(this);
  }
  componentWillMount(){
    $.ajax({
      type: 'GET',
      url: '/checkLoggedIn',
      async: false,
      success: function(data) {
        if (!data.username) {
          console.log('hit not authenticated');
          this.props.router.push({pathname: '/'});
        } else {
          console.log("hit authenticated");
          console.log(data.username);
          window.username = data.username;
          this.getMaps();
        }
      }.bind(this),
      error: function() {
        console.log('Error!');
      }
    });

  }
  getMaps() {
    var that = this;
    $.ajax({
      type: 'GET',
      url: '/maps',
      success: function(data) {
        console.log(data);
        console.log('success publicMaps', that.convertData(data[0], 'publicMaps'));
        console.log('success myMaps', that.convertData(data[1], 'myMaps'));
      }
    });
  }
  convertData(data, strName) {
     console.log(data);
     var that = this;
     var arrayMaps = [];
     //var obj = {};
     for (var i = 0; i < data.length ; i++){
        if (data[i]['user_id'] !== undefined) {
          arrayMaps.push(that.convertArray(data[i]['mapData']));
        }
        // tempArray.push(data[i]['shareable']);
        // tempArray.push(data[i]['user_id']);
        // arrayMaps.push(tempArray);
     }
     //obj[strName] = arrayMaps;
     this.setState({[strName] : arrayMaps});
     console.log('arrayMaps',arrayMaps);

  }
    //converts the map string into an array of row arrays
  convertArray(string) {
    var oneMap = [];
    var oneArray = [];
    for (var i = 0; string.length > i; i++){
      oneArray.push(Number(string[i]));
      if ((i+1) % 16 === 0){
        oneMap.push(oneArray.slice());
        oneArray = [];
      }
    }
    return oneMap;
  }

  enterMaze() {
    console.log('Entering maze...');
    this.setState({
      choice: !this.state.choice
    });
  }
  clickLevel (index, e) {
    var arr = [];
    for (var i = 0; i < 16; i++) {
      arr[i] = [];
      for(var j = 0; j < 16; j++) {
        arr[i].push(this.state.myMaps[index][i][j]);
      }
    }
    this.setState({
      maze: arr
    });
  }
  clickLegend (num, e) {
    this.setState({legend: num});

  }
  click(indy, index, e) {
    var curr = this.state.maze;
    if (this.state.legend === 1) {
      curr[indy][index] = 0;
    } else if (this.state.legend === 2) {
      curr[indy][index] = 1;
    } else if (this.state.legend === 3) {
      curr[indy][index] = 2;
    } else if (this.state.legend === 4 && this.state.pacFlag === 0) {
      curr[indy][index] = 3;
      this.setState({pacFlag : 1})
    } else if (this.state.legend === 5) {
      curr[indy][index] = 4;
    } else if (this.state.legend === 6) {
      curr[indy][index] = 5;
    } else if (this.state.legend === 7) {
      curr[indy][index] = 6;
    } else {
      if (curr[indy][index] === 0) {
        curr[indy][index] = 1;
      } else if (curr[indy][index] === 1) {
        curr[indy][index] = 2;
      } else if (curr[indy][index] === 2 && this.state.pacFlag === 0) {
        curr[indy][index] = 3;
        this.setState({pacFlag: 1});
      } else if (curr[indy][index] === 3) {
        curr[indy][index] = 0;
        this.setState({pacFlag: 0});
      } else if (curr[indy][index] === 2 && this.state.pacFlag === 1) {
        curr[indy][index] = 0;
      }
    }
    this.setState({
      maze: curr
    });

  }

  saveMaze() {
    // convert maze to string
    var that = this;
    var currentMaze = this.state.maze;
    var mazeData = '';
    for (var i = 0; i < currentMaze.length; i++) {
      for (var j = 0; j < currentMaze[i].length; j++) {
        mazeData += currentMaze[i][j];
      }
    }
    console.log('mapData', mazeData);
    var data = {
      mapData: mazeData,
      shareable: true,
      username: window.username
    }
    $.ajax({
      type: 'POST',
      url: '/maps',
      data: data,
      success: function() {
        console.log('success post to /maps');
        that.getMaps();
      }
    })
  }

  render() {
    return (
      <div className="maze">
      { this.state.choice ?
        <MazeRunner maze={this.state.maze} />
        : <MazeEditor clickLegend={this.clickLegend} mazes={this.state.myMaps} def={this.state.default1} clickLevel={this.clickLevel.bind(this)} click={this.click.bind(this)} maze={this.state.maze} enterMaze={this.enterMaze.bind(this)} saveMaze={this.saveMaze.bind(this)}/>
      }
      </div>
    );
  }
}
