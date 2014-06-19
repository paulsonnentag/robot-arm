'use strict';

module.exports = angular.module('robotArm.modifiers.transformModifier', [])

  .directive('transformModifier', function () {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      templateUrl: 'app/modifiers/transform-modifier.html',
      controller: function ($scope) {



      }
    };
  });