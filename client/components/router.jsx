// // Reactrouter was imported via cdn - defining often-used react-router variables here
var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var Link = window.ReactRouter.Link;
var browserHistory = window.ReactRouter.browserHistory;


// React router
var MainRouter = () => (
   <Router history={browserHistory}>
    <Route path="/" component={LandingPage} />
    <Route path="/profile" component={ProfilePage} />
    <Route path="/mazebuilder" component={App} />
    <Route path="/multiplayer" component={MultiplayerMazeRunner} />
  </Router>
);

ReactDOM.render(<MainRouter />, document.getElementById('app'));