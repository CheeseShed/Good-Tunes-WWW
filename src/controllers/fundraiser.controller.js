'use strict';

const moment = require('moment');

fundraiserController.$inject = [
  'fundraiser',
  '$scope',
  '$state',
  '$sce',
  '$window',
  'playlistService',
  'config'
];

function fundraiserController (
  fundraiser,
  $scope,
  $state,
  $sce,
  $window,
  playlistService,
  config
) {
  const vm = this;
  const stateToCheck = 'fundraisers.one';
  const mediaQuery = $window.matchMedia('(max-width: 768px)');

  let theme;

  if (moment(fundraiser.target_data).isAfter('2016-01-01')) {
    theme = 'page--light';
  } else {
    theme = 'page--orange';
  }

  function setup () {
    vm.backgroundImage = getBackgroundImage(fundraiser.id);
    vm.theme = theme;
    vm.fundraiser = fundraiser;
    vm.description = $sce.trustAsHtml(fundraiser.description);
    vm.summary = fundraiser.summary;
    $scope.overlayVisible = false;
    vm.title = fundraiser.title;
    vm.charity = fundraiser.charity;
    vm.id = fundraiser.id;
    vm.name = fundraiser.name;
    vm.isActive = moment().isBefore(fundraiser.target_date);
    vm.hasMask = hasMask;
    vm.hideOverviewPanel = hideOverviewPanel;
    vm.fetchPlaylist = fetchPlaylist;
    vm.hasSpotifyPlaylist = hasSpotifyPlaylist;
    vm.symbol = config.CURRENCIES[fundraiser.currency];
    mediaQuery.addListener(mediaQueryEventHandler);
  }

  function mediaQueryEventHandler (mediaQueryEvent) {
    $scope.$apply(function () {
      vm.hideOverviewPanel();
    });
  }

  function isSmallView () {
    return mediaQuery.matches;
  }

  function getBackgroundImage (id) {
    let image;

    if (id === '56154723229562110033f747') {
      image = '/images/ben.jpg';
    } else if (id === '56154ee4229562110033f74a') {
      image = '/images/jade.jpg';
    } else {
      image = '/images/ben-rek.jpg';
    }

    return image;
  }

  function hasSpotifyPlaylist () {
    return !!(vm.fundraiser.spotify_user_id && vm.fundraiser.spotify_playlist_id);
  }

  function hasMask () {
    return $state.current.name !== stateToCheck;
  }

  function hideOverviewPanel () {
    return $state.current.data.hideOverviewPanel && isSmallView();
  }

  function fetchPlaylist (id) {
    playlistService.readOne({id: id})
      .then(function (playlist) {
        vm.playlist = playlist.data.playlist;
        vm.tracks = playlist.data.tracks;
      });
  }

  setup();
}

module.exports = fundraiserController;
