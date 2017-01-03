var express = require('express');
//var bodyParser = require('body-parser');
var path = require('path');
//var controller = require('controller.js');
var app = express();

app.use(express.static(path.join(__dirname, './')));
// app.use(bodyParser.urlencoded({'extended':false}));
// app.use(bodyParser.json());
//app.get('/cool', controller.mazeRunner);

app.listen(3000);