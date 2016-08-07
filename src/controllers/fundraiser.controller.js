'use strict'

fundraiserController.$inject = [
  'fundraiser',
  '$scope',
  '$state',
  '$sce',
  '$window',
  'playlistService'
]

function fundraiserController (
  fundraiser,
  $scope,
  $state,
  $sce,
  $window,
  playlistService
) {
  const vm = this
  const stateToCheck = 'fundraisers.one'
  const mediaQuery = $window.matchMedia('(max-width: 768px)')

  function setup () {
    vm.fundraiser = fundraiser
    vm.person = fundraiser.user.name.toLowerCase().indexOf('ben') > -1 ? 'ben' : 'jade'
    vm.gender = vm.person === 'ben' ? 'he' : 'she'
    vm.description = $sce.trustAsHtml(fundraiser.description)
    $scope.overlayVisible = false
    vm.title = fundraiser.title
    vm.charity = fundraiser.charity
    vm.id = fundraiser.id
    vm.name = fundraiser.name

    vm.hasMask = hasMask
    vm.hideOverviewPanel = hideOverviewPanel
    vm.fetchPlaylist = fetchPlaylist

    $scope.toggleOverlay = toggleOverlay
    $scope.toggleSearchOverlay = toggleSearchOverlay

    mediaQuery.addListener(mediaQueryEventHandler)
  }

  function mediaQueryEventHandler (mediaQueryEvent) {
    $scope.$apply(function () {
      vm.hideOverviewPanel()
    })
  }

  function isSmallView () {
    return mediaQuery.matches
  }

  function hasMask () {
    return $state.current.name !== stateToCheck
  }

  function hideOverviewPanel () {
    return $state.current.data.hideOverviewPanel && isSmallView()
  }

  function toggleOverlay () {
    $scope.overlayVisible = !$scope.overlayVisible
  }

  function toggleSearchOverlay () {
    $scope.searchOverlayVisible = !$scope.searchOverlayVisible
  }

  function fetchPlaylist (id) {
    playlistService.readOne({id: id})
      .then(function (playlist) {
        vm.playlist = playlist.data.playlist
        vm.tracks = playlist.data.tracks
      })
  }

  setup()
}

module.exports = fundraiserController
