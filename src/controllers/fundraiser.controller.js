'use strict';

fundraiserController.$inject = ['$scope', '$state', '$sce', '$window', 'fundraiser', 'playlistService'];

function fundraiserController($scope, $state, $sce, $window, fundraiser, playlistService) {
  var vm = this;
  var stateToCheck = 'fundraisers.one';
  var mediaQuery = $window.matchMedia('(max-width: 768px)');

  var setup = function () {
    // add properties to the controller
    vm.fundraiser = fundraiser;
    vm.person = fundraiser.user.name.toLowerCase().indexOf('ben') > -1 ? 'ben' : 'jade';
    vm.gender = vm.person === 'ben' ? 'he' : 'she';
    vm.description = $sce.trustAsHtml(fundraiser.description);

    $scope.overlayVisible = false;

    mediaQuery.addListener(mediaQueryEventHandler);
  };

  var mediaQueryEventHandler = function (mediaQueryEvent) {
    $scope.$apply(function () {
      vm.hideOverviewPanel();
    });
  };

  var isSmallView = function () {
    return mediaQuery.matches;
  };

  this.hasMask = function () {
    return $state.current.name !== stateToCheck;
  };

  this.hideOverviewPanel = function () {
    return $state.current.data.hideOverviewPanel && isSmallView();
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

  setup();
}

module.exports = fundraiserController;
