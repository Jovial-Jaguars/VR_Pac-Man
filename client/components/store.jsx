import React from 'react';
import PublicMaps from './publicMaps';
import MyMaps from './myMaps';
var Sidebar = require('react-sidebar').default;

//This is the root component
export default class MazeStore extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
    return <div className="pacmanapp">
      <MapList router={this.props.router}/>
    </div>;
  }
}

class MapList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      myMaps: [],
      publicMaps: [],
      cartMaps: {},
      updateMyMaps: {},
      showMaps: 'publicMaps',
      fetched : false,
      loading : true,
      sidebarOpen: true,
      currentMapID: null,
    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.showMyMaps = this.showMyMaps.bind(this);
    this.showPublicMaps = this.showPublicMaps.bind(this);
    this.showCartMaps = this.showCartMaps.bind(this);
    this.purchaseOne = this.purchaseOne.bind(this);
    this.returnOne  = this.returnOne.bind(this);
    this.convertArray = this.convertArray.bind(this);
    this.convertData = this.convertData.bind(this);
    this.mazebuilderClick = this.mazebuilderClick.bind(this);
    this.navClickHome = this.navClickHome.bind(this);
    this.makeUpdate = this.makeUpdate.bind(this);
  }

  //converts the returned query data into and array of maps

convertData (data, strName) {
     console.log(data);
     var that = this;
     var arrayMaps = [];
     //var obj = {};
     for (var i = 0; i < data.length ; i++){
        var tempArray =[]
        tempArray.push(that.convertArray(data[i]['mapData']));
        tempArray.push(data[i]['id']);
        tempArray.push(data[i]['shareable']);
        tempArray.push(data[i]['user_id']);
        arrayMaps.push(tempArray);
     }
     //obj[strName] = arrayMaps;
     this.setState({[strName] : arrayMaps});
     console.log('arrayMaps',arrayMaps);
  }
  
  //converts the map string into an array of row arrays
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

componentWillMount(){
    var that = this;
    this.setState({
      loading : true
    });
    $.ajax({
      type: 'GET',
      url: '/maps',
      success: function(data) {
        console.log('success publicMaps', that.convertData(data[0], 'publicMaps'));
        console.log('success myMaps', that.convertData(data[1], 'myMaps'));
        that.setState({fetched: true});
      }
    });
    // $.ajax({
    //   type: 'POST',
    //   url: '/maps',
    //   data: {
    //   mapData: '1234',
    //   shareable: true,
    //   username: 'test',
    //   },
    //   success: function() {
    //     console.log('success');
    //   }
    // });

  }



   onSetSidebarOpen (bool) {
    this.setState({sidebarOpen: bool});
  }



  
  showMyMaps(){
    this.setState({showMaps: 'myMaps'});
    this.render();
  }

  showPublicMaps(){
    this.setState({showMaps: 'publicMaps'});

  }

  showCartMaps() {
    this.setState({showMaps: 'cartMaps'});

  }


  purchaseOne (mapId){
    var object = this.state.cartMaps;
    console.log(object);
    object[mapId] = this.state.publicMaps[mapId];
    this.setState({cartMaps: object});
    
  }

  returnOne (mapId) {
    var object = this.state.cartMaps;
    delete object[mapId];
    this.setState({cartMaps: object});
  }

  makeUpdate (mapId) {
    var object = this.state.updateMyMaps;
    if(object[mapId] === undefined){
      object[mapId] = this.state.myMaps[mapId];
      this.setState({updateMyMaps: object});
    } else if(object[mapId] !== undefined){
      delete object[mapId];
      this.setState({updateMyMaps: object});
    }
  }

  mazebuilderClick() {
    this.props.router.push({pathname: '/mazebuilder'});
  }

  navClickHome() {
    console.log('clicked home')
    this.props.router.push({pathname: '/'});
  }

  render(){
    const {fetched, loading, publicMaps, myMaps, showMaps, cartMaps} = this.state;
    let content ;
    var cartMapsArray = [];

    var sidebarContent = 
      <div>
        <h1 className='sidebar-title'>{window.username}'s Maze Store</h1>
        <div className='sidebar-options' data-icon="u" onClick={this.showPublicMaps}>MAZE MARKETPLACE</div>
        <div className='sidebar-options' data-icon="v" onClick={this.showMyMaps}>{window.username.toUpperCase()}'S MAZES</div>
        <div className="sidebar-options" data-icon="b" onClick={this.showCartMaps}>MAZE CART</div>
        <div className='sidebar-options' data-icon="i" onClick={this.mazebuilderClick.bind(this)}>MAZE BUILDER</div>
        <div className='sidebar-options' data-icon="j" onClick={this.navClickHome.bind(this)}>HOME</div>
      </div>;


    
    if(fetched && showMaps === 'publicMaps'){
      {console.log('inside show publicMaps', publicMaps);}
      content = <div className="maps">{publicMaps.map((singleMap, index)=><PublicMaps key={index} mapId={index} singleMap={singleMap} showMaps={showMaps} purchaseOne={this.purchaseOne.bind(this)} returnOne={this.returnOne.bind(this)} makeUpdate={this.makeUpdate.bind(this)}/>)}</div>;
    } else if (fetched && showMaps === 'myMaps'){
      {console.log('inside show myMaps', myMaps);}
      content = <div className="maps">{myMaps.map((singleMap, index)=><MyMaps key={index ? index : null} mapId={index ? index : 'bob'} singleMap={singleMap} showMaps={showMaps} purchaseOne={this.purchaseOne.bind(this)} returnOne={this.returnOne.bind(this)} makeUpdate={this.makeUpdate.bind(this)}/>)}</div>;
    } else if (fetched && showMaps === 'cartMaps'){
      {console.log('inside show cartMaps', cartMaps);}
      for(var key in cartMaps){
        cartMapsArray.push(cartMaps[key]);
      }
      content = <div className="maps">{cartMapsArray.map((singleMap, index)=><Map key={index} mapId={index} singleMap={singleMap} showMaps={showMaps} purchaseOne={this.purchaseOne.bind(this)} returnOne={this.returnOne.bind(this)} makeUpdate={this.makeUpdate.bind(this)}/>)}</div>;
    } else if(loading && !fetched){
        content = <p className='loading'> Loading ...</p>;
    }
    else{
      content = <div/>;
    }

    return  <div className="maps-container">
      
      {console.log(this.state.cartMaps)}

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
    boxShadow: '30px 30px 5px #00004C',
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
          <div className='hamburger' onClick={this.onSetSidebarOpen.bind(this, true)}  data-icon="L" ></div>
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

class Map extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      clickedIcon: '',
      showMaps: props.showMaps,
      singleMap: props.singleMap
    };

    this.clickedIconHandler = this.clickedIconHandler.bind(this);
  }


shouldComponentUpdate(){
  return true;
}

componentWillReceiveProps(nextprops){
  console.log('nextprops', nextprops);
  console.log('showMaps in receive', nextprops.showMaps);
  console.log('singleMap in receive', nextprops.singleMap);
  this.setState({showMaps: nextprops.showMaps, singleMap: nextprops.singleMap});
}

componentWillMount(){
  console.log('showmaps in mount',this.state.showMaps);
  console.log('singlemap in mount', this.state.singleMap);
  if(this.state.showMaps === 'publicMaps'){
    this.setState({clickedIcon: 'insertcoin'});
  } else if(this.state.showMaps === 'myMaps'){
    
    if (this.state.singleMap[2] === false){
      this.setState({clickedIcon: 'private'});
      console.log('private hit');
    } else if( this.state.singleMap[2] === true){
      this.setState({clickedIcon: 'public'});
      console.log('public hit');
    }
  } else if(this.state.showMaps === 'cartMaps'){
    this.setState({clickedIcon: 'onecredit'});
  }
}

clickedIconHandler (mapId){
  
  if (this.state.clickedIcon === 'insertcoin'){
    this.setState({clickedIcon: 'onecredit'});
    this.props.purchaseOne(mapId);
  } else if(this.state.clickedIcon === 'onecredit'){
      if(this.state.showMaps === 'publicMaps'){
        this.setState({clickedIcon: 'insertcoin'});
        this.props.returnOne(mapId);
      } else if (this.state.showMaps === 'cartMaps'){
        this.props.returnOne(mapId);
      }
  } else if (this.state.clickedIcon === 'public'){
    this.setState({clickedIcon: 'private'});
    this.props.makeUpdate(mapId);
  } else if (this.state.clickedIcon === 'private'){
    this.setState({clickedIcon: 'public'});
    this.props.makeUpdate(mapId);
  }
}

  render(){
    // var content;

    // <div className={this.state.clickedIcon} onClick ={this.clickedIconHandler.bind(this, this.props.mapId)}></div>

    // if(this.props.showMaps === 'publicMaps'){
    //    <div className={this.state.clickedIcon} onClick ={this.clickedIconHandler.bind(this, this.props.mapId)}></div>  
    // } else if (fetched && showMaps === 'myMaps'){
    //   {console.log('inside show myMaps', myMaps);}
    //   content = <div className="maps">{myMaps.map((singleMap, index)=><Map key={index} mapId={index} singleMap={singleMap} showMaps={showMaps} purchaseOne={this.purchaseOne.bind(this)} returnOne={this.returnOne.bind(this)}/>)}</div>;
    // } else if (fetched && showMaps === 'cartMaps'){
    //   {console.log('inside show cartMaps', cartMaps);}
    //   content = <div className="maps">{cartMaps.map((singleMap, index)=><Map key={index} mapId={index} singleMap={singleMap} showMaps={showMaps} purchaseOne={this.purchaseOne.bind(this)} returnOne={this.returnOne.bind(this)}/>)}</div>;
    // } else if(loading && !fetched){
    //     content = <p className='loading'> Loading ...</p>;
    // }
    // else{
    //   content = <div/>;
    // }
    

    
    return (
    <div className="singleMap-container">
      <table className="singleMap" >
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
      <div className={this.state.clickedIcon} onClick ={this.clickedIconHandler.bind(this, this.props.mapId)}></div>
    </div>);
    }
}


//render(<Store/>,document.getElementById('app'))