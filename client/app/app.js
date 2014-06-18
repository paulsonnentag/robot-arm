'use strict';

require('angular/angular');
require('angularFire/angularfire');

angular.module('robotArm', [
  'firebase',
  require('./app.ctrl').name,
  require('./timeline/timeline.module').name,
  require('./action/action.module').name,
  require('./modifiers/modifiers.module').name
]);