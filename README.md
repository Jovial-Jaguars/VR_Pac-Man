## Live

\*\*[This project is live!](https://www.vrpacman.com)

## Table of Contents

1. [VR Pacman](#VR_Pac-Man)
  1. [Overview](##Overview)
  2. [Controls](##Controls)
  3. [Supported browsers](##Supported_Browsers)
2. [Development](#development)
   1. [Overview](##Overview)
   2. [Authentication](##Authentication)
   3. [Libraries](##Libraries)
   4. [Goals&Accomplishments](##Goals&Accomplishments)
3. [Team](#team)

# VR_Pac-Man

![gif of playing vrpacman](./vrpacman.gif)

Bringing the timeless arcade game, PacMan, to a Virtual Reality platform where users experience an immersive first person challenge reminiscent of the original PacMan.

## Overview

VR Pacman is a virtual reality spin on the classic 1980s Pac-man game by Namco. In VR Pacman, you become the Pac-man in this first-person maze traversing game. Users can compete in ranked games or play in custom private games with their friends. They can also design or purchase their own virtual reality mazes and share them to the world. This game is meant for both mobile (virtual reality) and Desktop (360 degree camera).

## Controls

Collect as many pellets as possible while avoiding the ghost coming after you.

- **Turn Your VR Headset** - for mobile VR
- **Mouse Click and Drag** - for desktop

## Supported_Browsers

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

# Development

## DevOverview

VR PacMan is built with a React frontend served throught the express js backend using  MYSQL database. Authentication is provided
using passport based sessions. The webvr game is built using Babylonjs rendering engine, Cannon js is used to simulate physics
within the game. 

## Authentication

Authentication is provided using a session approach. 
When the user signs up, their details are passed via https in the authorization header. 
The password is then hashed using bcrypt and stored in the backend and
a verification email is sent to the user with a signed token. 
When the user verifies the account by clicking on the emailed link, the account is activated by verifying the jwt token.
When the user logsin, the username and password are sent to the backend via https in the auth header.
The password is hashed using bcrypt, verified, and a new session is created for the user with the session id stored in the
cookie.

## Libraries

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
- [Passport-google-oauth2](http://www.passportjs.org/packages/passport-google-oauth20/) - Passportgoogle is a strategy for google authentication

## Goals&Accomplishments

- [x] Build virtual reality environment (walls, pellets, ghosts, etc)
- [x] Apply physics and gravity via Cannon.js
- [x] AI, ghost path rendering and logic
- [x] Build custom meshes
- [x] mulitplayer
- [x] Handle collisions between meshes
- [x] attach camera and lighting
- [x] build mazes in javascript and render to 3d environment
- [x] authentication and use profiles with facebook and email
- [x] custom maze builder and editor
- [x] scoring platform
- [x] multifloor maze design

# Team
- **Development Team Members**: Don Nguyen, Humaid Khan, Wells Tsai, 
