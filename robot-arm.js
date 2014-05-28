var _ = require('lodash');
var usb = require('usb');

var BITS = [
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

function getRobotArm () {
  var devices = usb.getDeviceList();
  return _.find(devices, {deviceDescriptor: {idVendor: 4711, idProduct: 0}});
}

function getCommand(state) {
  var command = new Buffer(3);

  command[0] = _.reduce(state, _.partial(addComponentBit, BITS[0]), 0);
  command[1] = _.reduce(state, _.partial(addComponentBit, BITS[1]), 0);
  command[2] = _.reduce(state, _.partial(addComponentBit, BITS[2]), 0);

  return command;
}

function addComponentBit(bits, command, mode, component) {
  if (!bits[component]) {
    return command
  }
  return command | bits[component][mode];
}

function sendCommand (state) {
  var robotArm = getRobotArm();
  var command = getCommand(state);

  robotArm.open();

  robotArm.controlTransfer(0x40, 6, 0x100, 0, command, function (err) {
    robotArm.close();
  });
}

module.exports = {
  sendCommand: sendCommand
};






