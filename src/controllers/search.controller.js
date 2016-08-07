'use strict'

donateController.$inject = [
  'fundraiser',
  '$state',
  '$scope',
  'TrackService',
  'AccessService',
  'StorageService',
  'spotifyService'
]

function donateController (
  fundraiser,
  $state,
  $scope,
  TrackService,
  AccessService,
  storageService,
  spotifyService
) {
  var vm = this

  function setup () {
    vm.donateTrack = donateTrack
    vm.fundraiser = fundraiser
    vm.person = fundraiser.user.name.toLowerCase().indexOf('ben') > -1 ? 'ben' : 'jade'
    vm.gender = vm.person === 'ben' ? 'he' : 'she'
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
      .search({
        q: query
      })
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
