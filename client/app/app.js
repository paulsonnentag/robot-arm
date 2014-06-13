'use strict';

require('angular/angular');

angular.module('robotArm', [
  require('./app.ctrl').name,
  require('./timeline/timeline.module').name,
  require('./action/action.module').name,
  require('./modifiers/modifiers.module').name
]);