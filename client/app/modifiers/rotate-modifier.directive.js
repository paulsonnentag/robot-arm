'use strict';

module.exports = angular.module('robotArm.modifiers.rotateModifier', [])

  .constant('maxRotation', 135)

  .directive('rotateModifier', function () {
    return {
      restrict: 'EA',
      templateUrl: 'app/modifiers/rotate-modifier.html',
      scope: {
        data: '='
      },
      controller: function ($scope, maxRotation) {

        $scope.$watch('data.rotation', function (rotation, prevRotation) {
          if (Math.abs(rotation) > maxRotation) {
            $scope.data.rotation = norm(rotation) * maxRotation;
          }
        });

        function norm(x) {
          return x < 0 ? -1 : 1;
        }
      }
    }
  });