'use strict';

donateController.$inject = ['$scope'];

function donateController($scope) {
  console.log('donate', $scope);

  $scope.tracks = [];
}

module.exports = donateController;
