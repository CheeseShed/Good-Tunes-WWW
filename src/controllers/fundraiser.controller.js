'use strict';

fundraiserController.$inject = ['$rootScope', '$scope', 'fundraiser', 'fundraiserService', 'playlistService'];

function fundraiserController($rootScope, $scope, fundraiser, fundraiserService, playlistService) {
  var vm = this;

  vm.fundraiser = fundraiser;
  vm.person = fundraiser.user.name.toLowerCase().indexOf('ben') > -1 ? 'ben' : 'jade';
  vm.gender = vm.person === 'ben' ? 'he' : 'she';

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
