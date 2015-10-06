'use strict';

fundraiserController.$inject = ['$scope', 'fundraiser', 'fundraiserService', 'playlistService'];

function fundraiserController($scope, fundraiser, fundraiserService, playlistService) {
  var vm = this;
  vm.fundraiser = fundraiser;

  $scope.overlayVisible = false;

  $scope.toggleOverlay = function() {
    $scope.overlayVisible = !$scope.overlayVisible;
  };

  $scope.toggleSearchOverlay = function() {
    $scope.searchOverlayVisible = !$scope.searchOverlayVisible;
  };

  this.update = function (model) {
    this.fundraiser.$update(function (model) {
      console.log(model);
    });
  };

  this.fetchPlaylist = function (id) {
    playlistService.readOne({id: id})
      .then(function (playlist) {
        vm.playlist = playlist.data.playlist;
        vm.tracks = playlist.data.tracks;
      });
  };
}

module.exports = fundraiserController;
