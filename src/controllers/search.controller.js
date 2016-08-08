'use strict'

donateController.$inject = [
  'fundraiser',
  '$state',
  '$scope',
  '$location',
  'TrackService',
  'AccessService',
  'StorageService',
  'spotifyService'
]

function donateController (
  fundraiser,
  $state,
  $scope,
  $location,
  TrackService,
  AccessService,
  storageService,
  spotifyService
) {
  var vm = this

  function setup () {
    vm.donateTrack = donateTrack
    vm.fundraiser = fundraiser
    vm.hasTrackToDonate = false
    vm.search = search

    $scope.tracks = []
    // $scope.$on('donate:complete', donationCompleteHandler)
  }

  function donateTrack (track) {
    sessionStorage.setItem('trackToDonate', angular.toJson(track));
    $state.go('fundraisers.one.donate', {
      fundraiser: fundraiser.id,
      playlist: fundraiser.playlist
    });
  }

  function search (query) {
    spotifyService
      .search(query)
      .then((tracks) => {
        $scope.tracks = tracks
      })
      .then(() => {
        $location.search({
          q: query
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  setup()
}

module.exports = donateController
