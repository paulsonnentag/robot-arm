var robotArm = require('./robot-arm.js');
var actionQueue = require('./actionQueue');

var queue = actionQueue('https://robotarm.firebaseio.com/actions');


console.log('started server http://localhost:8080');


