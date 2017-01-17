import React from 'react';
var Sidebar = require('react-sidebar').default;


var allMaps2 =  [[
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
[1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
[1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
],
[
[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
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
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
]];
  

var allMaps =  [[
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
[1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
[1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
],
[
[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
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
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
],
[
[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
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
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
],
[
[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
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
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
],
[
[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
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
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
],
[
[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
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
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
],
[
[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
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
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
]
];




class Map extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      purchaseMap: 'insertcoin',
    }
    console.log(props);
  }

purchaseThisMap (mapId){
  
  if (this.state.purchaseMap === 'insertcoin'){
    this.setState({purchaseMap: 'onecredit'});
    this.props.purchaseOne(mapId);
  } else {
    this.setState({purchaseMap: 'insertcoin'});
    this.props.returnOne(mapId);
  }
}

  render(){
    return (
    <div className="singleMap-container">
      <table className="singleMap" >
      <tbody>
      {
        this.props.singleMap.map((curr, indy)=> (
          <tr key = {''+indy} className="tablerow-mapstore">
          {curr.map((num, index, arr) => {
            if (num === 0) {
              return (<td key = {''+index} className="blank" ></td>);
            } else if (num === 1) {
              return (<td key = {''+index} className="wall"></td>);
            } else if (num === 2) {
              return (<td key = {''+index} className="pellet" ></td>);
            } else if (num === 3) {
              return (<td key = {''+index} className="pacmanmaze"></td>);
            } 
          })}
          </tr>
        ))

      }
      </tbody>
      </table>
      <div className={this.state.purchaseMap} onClick ={this.purchaseThisMap.bind(this, this.props.mapId)}></div>
    </div>);
    }
}














class MapList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      maps : allMaps,
      fetched : true,
      loading : true,
      showMyMaps: false,
      mapsPurchased: {},
      sidebarOpen: true,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
  // componentWillMount(){
  //   this.setState({
  //     loading : true
  //   });
  //   fetch('http://pokeapi.co/api/v2/pokemon?limit=151').then(res=>res.json())
  //   .then(response=>{
  //     this.setState({
  //       species : response.results,
  //       loading : true,
  //       fetched : true
  //     });
  //   });
  // }

   onSetSidebarOpen (open) {
    this.setState({sidebarOpen: open});
  }

  convertArray (string) {
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

  showMyCart (){

  }




  purchaseOne (mapId){
    var object = this.state.mapsPurchased;
    console.log(object);
    object[mapId] = this.state.maps[mapId];
    this.setState({mapsPurchased: object});
    
  }

  returnOne (mapId) {
    var object = this.state.mapsPurchased;
    delete object[mapId];
    this.setState({mapsPurchased: object});
  }

  render(){
    const {fetched, loading, maps} = this.state;
    let content, singleTable ;

    var sidebarContent = <b>Sidebar content 123456</b>;

    if(fetched){
      content = <div className="maps">{maps.map((singleMap, index)=><Map key={index} mapId={index} singleMap={singleMap} purchaseOne={this.purchaseOne.bind(this)} returnOne={this.returnOne.bind(this)}/>)}</div>;
    }else if(loading && !fetched){
        content = <p> Loading ...</p>;
    }
    else{
      content = <div/>;
    }
    return  <div className="maps-container">
      
      {console.log(this.state.mapsPurchased)}

      <Sidebar sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               onSetOpen={this.onSetSidebarOpen}
               styles={{
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  sidebar: {
    zIndex: 30,
    position: 'absolute',
    top: 0,
    bottom: 0,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto',
    backgroundColor: 'blue',
    boxShadow: '20px 20px 5px #00004C',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    transition: 'left .3s ease-out, right .3s ease-out',
    boxShadow: '10px 10px 5px #00004C',
  },
  overlay: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease-out',
    backgroundColor: 'rgba(0,0,0,.3)',
    boxShadow: '10px 10px 5px #00004C',
  },
  dragHandle: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    bottom: 0,
  }
}}>
      <div className='title-container'>
          <div className='hamburger' onClick={this.onSetSidebarOpen.bind(this,open)}  data-icon="L" ></div>
        <div className='title-parent'>
          <div className='title' data-text="Welcome to the MapStore">Welcome to the MapStore</div>
        </div>
      </div>
      <div className='maps-sub-container'>  
      {content}
      </div>
      </Sidebar>

    </div>;
  }
}


//This is the root component
export default class MazeStore extends React.Component{
  render(){
    return <div className="pacmanapp">
      <MapList/>
    </div>;
  }
}

//render(<Store/>,document.getElementById('app'))
