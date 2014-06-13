'use strict';

module.exports = angular.module('robotArm.modifiers', [
  require('./toggle-modifier.directive').name,
  require('./transform-modifier.directive').name,
  require('./rotate-modifier.directive').name,
]);