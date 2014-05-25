'use strict';

var _ = require('lodash');

// name, number of arguments
var transformMethods = {
  rotate: 3,
  scale: 2,
  translate: 2,
  skewX: 1,
  skewY: 1,
  skewZ: 1
};

var slice = [].slice;

function Transform () {
  this._transforms = {};
}

Transform.prototype = _.reduce(transformMethods, addTransformMethod, {});

Transform.prototype.toString = function () {
  return _.values(this._transforms).join(' ');
};

function addTransformMethod (prototype, numOfArguments, name) {
  prototype[name] = function () {
    this._transforms[name] = getTransformString(name, numOfArguments, arguments);
    return this;
  };

  return prototype;
}

function getTransformString (name, numOfArguments, args) {
  return name + '(' + slice.call(args, 0, numOfArguments).join(', ') + ')'
}

module.exports = Transform;