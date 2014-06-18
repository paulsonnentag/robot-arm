'use strict';

var _ = require('lodash');

module.exports = angular.module('robotArm.timeline.directive', [])

  .directive('timeline', function () {

    return {
      restrict: 'EA',
      templateUrl: 'app/timeline/timeline.html',
      scope: {
        actions: '='
      },
      controller: function ($scope) {

        function getInitialData (type, actions) {
          var prev = _.find(actions, {type: type});

          switch (type) {
            case 'light':
            case 'grip':
              return prev ? {enabled: !prev.data.enabled} : {enabled: true};
            case 'transform':
              return prev ? prev.data : {
                shoulder: 0,
                elbow: 0,
                wrist: 0
              };
            case 'rotate':
              return {
                rotation: 0
              };
          }
        }

        $scope.$on('addAction', function (e, type) {
          $scope.actions.push({
            type: type,
            data: getInitialData(type, $scope.actions)
          });
        });
      }
    };
  });
