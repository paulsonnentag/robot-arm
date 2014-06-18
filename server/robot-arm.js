var _ = require('lodash');
var usb = require('usb');
var es = require('event-stream');

var noop = function () {};

var COMMAND_BITS = [
  {
    shoulder: {
      up: 64,
      down: 128
    },
    elbow: {
      up: 16,
      down: 32
    },
    wrist: {
      up: 4,
      down: 8
    },
    grip: {
      open: 2,
      close: 1
    }
  },
  {
    base: {
      right: 1,
      left: 2
    }
  },
  {
    light: {
      on: 1,
      off: 0
    }
  }
];

var state = {
  grip: false,
  light: false,
  rotation: 0
};

var commandStream = es.through(function (action) {
  var self = this;


  console.log(action.type, action.data);

  if (action.type === 'light') {

    state.light = action.data.enabled;

  } else if (action.type === 'grip') {

    this.pause();

    state.grip = action.data.enabled;

    runCommand({
      grip: action.data.enabled ? 'close' : 'open',
      light: state.light ? 'on' : 'off'
    }, 1550, self.resume);

  } else if (action.type === 'rotate') {
    var diff = (action.data.rotation - state.rotation);

    state.rotation += diff;

    var t = Math.abs(diff) * 60;

    this.pause();

    runCommand({
      base: diff < 0 ? 'left' : 'right',
      light: state.light ? 'on' : 'off'
    }, t, self.resume);
  }

});


function getRobotArm () {
  var devices = usb.getDeviceList();
  return _.find(devices, {deviceDescriptor: {idVendor: 4711, idProduct: 0}});
}

function getCommand(state) {
  var command = new Buffer(3);

  command[0] = _.reduce(state, _.partial(addComponentBit, COMMAND_BITS[0]), 0);
  command[1] = _.reduce(state, _.partial(addComponentBit, COMMAND_BITS[1]), 0);
  command[2] = _.reduce(state, _.partial(addComponentBit, COMMAND_BITS[2]), 0);

  return command;
}

function addComponentBit(COMMAND_BITS, command, mode, component) {
  if (!COMMAND_BITS[component]) {
    return command
  }
  return command | COMMAND_BITS[component][mode];
}




function sendCommand (state, callback) {
  var robotArm = getRobotArm();
  var command = getCommand(state);

  robotArm.open();

  robotArm.controlTransfer(0x40, 6, 0x100, 0, command, function (err) {
    robotArm.close();
    callback();
  });
}


function runCommand (state, t, callback) {
  sendCommand(state, function () {
    setTimeout(function () {
      sendCommand({}, callback)
    }, t)
  });
}

module.exports = {
  commandStream: commandStream,

  runCommand: runCommand,

  sendCommand: sendCommand
};






