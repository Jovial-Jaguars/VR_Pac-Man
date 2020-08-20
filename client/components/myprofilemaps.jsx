
import React from 'react';



export default class MyProfileMaps extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      clickedIcon: '',
    };

//    this.clickedIconHandler = this.clickedIconHandler.bind(this);
  }


// componentWillMount(){
//   console.log('showmaps in mount',this.props.showMaps);
//   console.log('singlemap in mount', this.props.singleMap);
//   if(this.props.showMaps === 'publicMaps'){
//     this.setState({clickedIcon: 'insertcoin'});
//   } else if(this.props.showMaps === 'myMaps'){

//     if (this.props.singleMap[2] === false){
//       this.setState({clickedIcon: 'private'});
//       console.log('private hit');
//     } else if( this.props.singleMap[2] === true){
//       this.setState({clickedIcon: 'public'});
//       console.log('public hit');
//     }
//   } else if(this.props.showMaps === 'cartMaps'){
//     this.setState({clickedIcon: 'onecredit'});
//   }
// }

// clickedIconHandler (mapId){

//   if (this.state.clickedIcon === 'insertcoin'){
//     this.setState({clickedIcon: 'onecredit'});
//     this.props.purchaseOne(mapId);
//   } else if(this.state.clickedIcon === 'onecredit'){
//       if(this.props.showMaps === 'publicMaps'){
//         this.setState({clickedIcon: 'insertcoin'});
//         this.props.returnOne(mapId);
//       } else if (this.props.showMaps === 'cartMaps'){
//         this.props.returnOne(mapId);
//       }
//   } else if (this.state.clickedIcon === 'public'){
//     this.setState({clickedIcon: 'private'});
//     this.props.makeUpdate(mapId);
//   } else if (this.state.clickedIcon === 'private'){
//     this.setState({clickedIcon: 'public'});
//     this.props.makeUpdate(mapId);
//   }
// }
  mapSelected(event) {
    console.log(this.props.singleMap[0]);
    window.selectedMaze = this.props.singleMap[0];
  }

  render(){
    return (
    <div className="singleProfileMap-container">
      <table className="singleProfileMap" onClick={this.props.mapSelect}>
      <tbody>
      {
        this.props.singleMap[0].map((curr, indy)=> (
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
    </div>);
    }
}
