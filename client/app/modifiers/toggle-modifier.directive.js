'use strict';

module.exports = angular.module('robotArm.modifiers.toggleModifier', [])

  .directive('toggleModifier', function () {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      templateUrl: 'app/modifiers/toggle-modifier.html',
      controller: function ($scope) {

        $scope.toggle = function () {
          $scope.data.enabled = !$scope.data.enabled;
        };
      }
    };
  });