# VR_Pac-Man

![alt text](https://i.imgsafe.org/1dee5367d6.png)

Bringing the timeless arcade game, PacMan, to a Virtual Reality platform where users experience an immersive first person challenge reminiscent of the original PacMan.

## Live

\*\*[This project is live!](https://www.vrpacman.com)

## Overview

VR Pacman is a virtual reality spin on the classic 1980s Pac-man game by Namco. In VR Pacman, you become the Pac-man in this first-person maze traversing game. Users can compete in ranked games or play in custom private games with their friends. They can also design or purchase their own virtual reality mazes and share them to the world. This game is meant for both mobile (virtual reality) and Desktop (360 degree camera).

# Controls

Collect as many pellets as possible while avoiding the ghost coming after you.

- **Turn Your VR Headset** - for mobile VR
- **Mouse Click and Drag** - for desktop

# Supported Browsers

<table>
  <tr>
    <th>Browser</th>
    <th>Supported</th>
    <th>Tested Versions</th>
  </tr>
  <tr>
    <th>Google Chrome</th>
    <td>Yes</td>
    <td>23.0; 24.0</td>
  </tr>
  <tr>
    <th>Firefox</th>
    <td>Yes</td>
    <td>17.0; 18.02</td>
  </tr>
  <tr>
    <th>Safari</th>
    <td>Yes*</td>
    <td>5.1.7</td>
  </tr>
  <tr>
    <th>IE</th>
    <td>Yes*</td>
    <td>10.0</td>
  </tr>
</table>
_*Game sound is currently (and sadly) not working under IE & Safari browsers!_

# Open Source Libraries

VR PacMan uses the following libraries:

- [React](https://facebook.github.io/react/) - A Javascript library for building user interfaces.
- [BabylonJS](http://babylonjs.com/) - An amazing Javascript/HTML5 Game engine.
- [jQuery](http://jquery.com/) - The Write Less, Do More, JavaScript Library.
- [Blender](https://www.blender.org/) - Open Source 3D creation. Free to use for any purpose, forever.
- [Express](http://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [MySQL](https://www.mysql.com/) - The world's most popular open source database.
- [NodeJS](https://nodejs.org/) - Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
- [Cannon.js](http://www.cannonjs.org/) - A physics engine, written in JavaScript.
- [Socket.IO](http://socket.io/) - Enables real-time bidirectional event-based communication.
- [Passport.js](http://passportjs.org/) - Passport is authentication middleware for Node.js.
- [Passport-local](http://www.passportjs.org/packages/passport-local/) - Passport local is a strategy for local authenitcation
- [Passport-facebook](http://www.passportjs.org/packages/passport-facebook/) - Passport facebook is a strategy for facebook authentication

# Goals & Accomplishments

- [x] Build virtual reality environment (walls, pellets, ghosts, etc)
- [ ] Use textures and materials to enhance player experience
- [x] Apply physics and gravity via Cannon.js
- [x] AI, ghost path rendering and logic
- [x] Build custom meshes
- [x] mulitplayer
- [x] Handle collisions between meshes
- [ ] bitcoin marketplace
- [x] attach camera and lighting
- [x] build mazes in javascript and render to 3d environment
- [x] authentication and use profiles with facebook and email
- [x] custom maze builder and editor
- [x] scoring platform
- [x] multifloor maze design
- [ ] advanced gui design

# Money.io Backend

This project is live here [https://money-io.vercel.app](https://money-io.vercel.app/)

Money.io is a financing app that allows users to keep track of their spendings as well as debts and loans.

## Table of Contents

1. [Usage](#Usage)
2. [Development](#development)
   1. [Overview](#Overview)
   2. [Authentication](#Authentication)
   3. [Libraries](#Libraries)
3. [Team](#team)

## Usage

Users can signup using money.io or login with their google accounts for faster access
![Image of Money.Io signin page](./signinPage.png)

Once logged in, users can keep track of their spendings from the transactions page
![Image of Money.Io transactions page](./transactions.png)

Once logged in, users can keep track of debts due and lowned by adding them from the debts page
![Image of Money.Io debts page](./debts.png)

## Development

### Overview

Money.io backend is built using an Nodejs server built using Express js routes for CRUD operations to
the MYSQL database. The routes are protected by an Passport js middleware and gets the user Redis session

### Authentication

Authentication is provided using 2 patterns:

1. Using local signup/signin
1. User sends a signup POST request to /signup with username, email, password in authorization header
1. The user info is stored in the MYSQL database with the password hashed and an active field as false
1. An email is sent to the user using nodemailer with a jwt token link pointing to /verifyemail
1. When the user clicks the link, it sends a get request to /verifyemail with the jsonwebtoken as a url parameter
1. Once the token is verified, the user's active field is set to true
1. The user can then signin by sending a POST request to /signin with the username and password in the header
1. If the username, password hash match, and the active status is true, a new Passport/Redis session is created and username is returned with a status 200 indicating to the client to redirect the user into the transactions page
1. Using google's signin flow [Google signin](https://developers.google.com/identity/sign-in/web/backend-auth)
1. User logsin with their google details and provides consent
1. Google returns a token for the user
1. The token is sent to the backend using the authorization header to the /verifygoogle endpoint
1. Upon token verification redis session is started using passport.js and username is returned with a status 200 indicating to the client to redirect the user into the transactions page

### Libraries

Money.IO is built using the following libraries to provide a safe, easy to use
and easy to maintain user and development experience.
Backend:

1. [Node.js](https://nodejs.org/en/) which provides javascript runtime bult using V8 to run javascript
2. [Express.js](https://expressjs.com/) which provides a web application framework to help build a server
3. [MYSQL](https://www.mysql.com/) which provides a database to store user's information, transactions, and debts
4. [Passport.js](http://www.passportjs.org/) which provides an authentication framework
5. [Redis.io](https://redis.io/) which provides a datastore to hold user session data
6. [passport-local](https://github.com/jaredhanson/passport-local) which provides a local passport strategy to
   start a server-side session on successful authentication
7. [passport-google-strategy](https://github.com/humaidk2/passport-google-strategy#readme) which provides a google strategy
   to start a server-side session on successful token verification
8. [Heroku](https://www.heroku.com/) which allows easy deployment through git

Frontend:

1. [Next.js](https://nextjs.org/) which provides faster loads time using server side rendering
2. [React.js](https://reactjs.org/) which provides a safer, scalable viewing experience
   , as well as much shorter code using the new React hooks api
3. [Redux.js](https://redux.js.org/) which stores state in a much more manageable layout
4. [react-google-login](https://github.com/anthonyjgrove/react-google-login) which provides an easy to use login
   button based on google's signin recommended practice
5. [Vercel](https://vercel.com/) which provides a free and easy way to host nextjs apps
6. [avataaars](https://github.com/fangpenlin/avataaars) which allows for an easy way to generate avataaars

## Team

Project was rewritten by Humaid Khan

[Original Project](https://github.com/humaidk2/Money-io)

original Team:

- **Product Owner**: Jonathan Wu
- **Scrum Master**: Humaid Khan
- **Development Team Members**: Dunstan Zheng, Chris Lu
