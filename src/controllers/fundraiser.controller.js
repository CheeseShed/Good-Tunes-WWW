'use strict';

fundraiserController.$inject = ['$scope', '$state', '$sce', 'fundraiser', 'playlistService'];

function fundraiserController($scope, $state, $sce, fundraiser, playlistService) {
  var vm = this;
  var stateToCheck = 'fundraisers.one';

  vm.fundraiser = fundraiser;
  vm.person = fundraiser.user.name.toLowerCase().indexOf('ben') > -1 ? 'ben' : 'jade';
  vm.gender = vm.person === 'ben' ? 'he' : 'she';
  vm.description = $sce.trustAsHtml(fundraiser.description);

  $scope.overlayVisible = false;

  this.hasMask = function () {
    return $state.current.name !== stateToCheck;
  };

  $scope.toggleOverlay = function() {
    $scope.overlayVisible = !$scope.overlayVisible;
  };

  $scope.toggleSearchOverlay = function() {
    $scope.searchOverlayVisible = !$scope.searchOverlayVisible;
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
