'use strict';

const omit = require('lodash/object/omit');

donateController.$inject = ['fundraiser','$scope', 'TrackService'];

function donateController(fundraiser, $scope, TrackService) {
  let vm = this;

  vm.fundraiser = fundraiser;
  vm.trackToDonate = null;
  vm.hasTrackToDonate = false;

  $scope.tracks = [];

  function donateTrack(track) {
    vm.hasTrackToDonate = true;
    $scope.$broadcast('donate:open', track);

    // track = omit(track, '$$hashKey');
//    track.playlist = playlistId;

    // TrackService
    //   .create(track)
    //   .then(function (data) {
    //     console.log(data);
    //   })
    //   .catch(function (err) {
    //     console.error(err);
    //   });
  }

  function donationCompleteHandler(event, donation) {
    console.log('DONATION FROM CROWDRISE');
    console.log(donation);
  }

  function setup() {
    vm.donateTrack = donateTrack;

    $scope.$on('donate:complete', donationCompleteHandler);

    // if (searchResults) {
    //   $scope.tracks = searchResults;
    // }
  }

  setup();
}

module.exports = donateController;
