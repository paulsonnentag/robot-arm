'use strict';

module.exports = angular.module('robotArm.app', [])

  .controller('AppController', function ($scope) {

    $scope.actions = [
      {type: 'grip', data: {}},
      {type: 'rotate', data: {}},
      {type: 'light', data: {}},
      {type: 'transform', data: {}}
    ];

  });
