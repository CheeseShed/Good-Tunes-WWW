'use strict';

donateController.$inject = [
  'fundraiser',
  '$state',
  '$location',
  'StorageService',
  'spotifyService'
];

function donateController (
  fundraiser,
  $state,
  $location,
  storageService,
  spotifyService
) {
  var vm = this;

  function setup () {
    const query = $state.params.q;

    vm.donateTrack = donateTrack;
    vm.fundraiser = fundraiser;
    vm.search = search;
    vm.tracks = [];

    if (query && query.length) {
      search(query);
    }
  }

  function donateTrack (track) {
    storageService.setItem('trackToDonate', angular.toJson(track));
    $state.go('fundraisers.one.donate', {
      fundraiser: fundraiser.id,
      playlist: fundraiser.playlist,
      trackToDonate: track.id
    });
  }

  function search (query) {
    spotifyService
      .search(query)
      .then((tracks) => {
        vm.tracks = tracks;
      })
      .then(() => {
        $location.search({
          q: query
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setup();
}

module.exports = donateController;
