'use strict';

module.exports = angular.module('robotArm.timeline.addAction', [])

  .directive('addAction', function () {

    return {
      restrict: 'EA',
      templateUrl: 'app/timeline/add-action.html',
      controller: function ($scope) {

        $scope.showOptions = false;

        $scope.toggleOptions = function () {
          $scope.showOptions = !$scope.showOptions;
        };

        $scope.hideOptions = function () {
          $scope.showOptions = false;
        };

        $scope.addAction = function (type) {
          $scope.$emit('addAction', type);
        }
      }
    };
  });
