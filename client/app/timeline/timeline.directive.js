'use strict';

module.exports = angular.module('robotArm.timeline.directive', [])

  .directive('timeline', function () {

    return {
      restrict: 'EA',
      templateUrl: 'app/timeline/timeline.html',
      scope: {
        actions: '='
      },
      controller: function ($scope) {

        $scope.$on('addAction', function (e, type) {
          $scope.actions.push({
            type: type,
            data: {}
          })
        });
      }
    };
  });
