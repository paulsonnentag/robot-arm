var robotArm = require('./robot-arm.js');
var actionQueue = require('./action-queue.js')('https://robotarm.firebaseio.com/actions');

actionQueue.pipe(robotArm.commandStream);