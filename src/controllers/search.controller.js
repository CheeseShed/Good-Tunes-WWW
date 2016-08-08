'use strict'

donateController.$inject = [
  'fundraiser',
  '$state',
  '$location',
  'StorageService',
  'spotifyService'
]

function donateController (
  fundraiser,
  $state,
  $location,
  storageService,
  spotifyService
) {
  var vm = this

  function setup () {
    const query = $state.params.q;

    vm.donateTrack = donateTrack
    vm.fundraiser = fundraiser
    vm.hasTrackToDonate = false
    vm.search = search
    vm.tracks = []
    // $scope.$on('donate:complete', donationCompleteHandler)

    if (query.length) {
      search(query);
    }
  }

  function donateTrack (track) {
    // sessionStorage.setItem('trackToDonate', angular.toJson(track));
    $state.go('fundraisers.one.donate', {
      fundraiser: fundraiser.id,
      playlist: fundraiser.playlist
    });
  }

  function search (query) {
    spotifyService
      .search(query)
      .then((tracks) => {
        vm.tracks = tracks
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
