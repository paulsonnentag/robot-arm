var http = require('http');
var express = require('express');
var morgan = require('morgan');
var robotArm = require('./robot-arm.js');


var app = express();
var server = http.Server(app);
var io = require('socket.io').listen(server);

app.use(morgan('dev'));
app.use(express.static(__dirname + '/client'));

server.listen(8080);

console.log('started server http://localhost:8080');

io.sockets.on('connection', function (socket) {
  socket.on('command', function (command) {
    console.log(command);
    robotArm.sendCommand(command);
  });
});

