(function () {
  'use strict';

  angular.module('robotArm.action', [])

    .directive('action', function () {

      return {
        restrict: 'EA',
        templateUrl: 'app/action/action.html',
        scope: {
          type: '=',
          data: '='
        },
        controller: function ($scope) {

        }
      };
    });

}());