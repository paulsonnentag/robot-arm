'use strict';

module.exports = angular.module('robotArm.app', [])

  .controller('AppController', function ($scope, $firebase) {
    var actionsFirebase = $firebase(new Firebase('https://robotarm.firebaseio.com/actions'));

    $scope.actions = [{
      type: 'transform',
      data: {
        wrist: 0,
        elbow: 0,
        shoulder: 0
      }
    }];

    $scope.runActions = function () {
      console.log($scope.actions);

      actionsFirebase.$add($scope.actions);
    };

  });
