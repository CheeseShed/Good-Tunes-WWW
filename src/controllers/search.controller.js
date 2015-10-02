'use strict';

const omit = require('lodash/object/omit');

donateController.$inject = ['fundraiser', '$state', '$scope', 'TrackService', 'AccessService'];

function donateController(fundraiser, $state, $scope, TrackService, AccessService) {
  let vm = this;

  vm.fundraiser = fundraiser;
  vm.trackToDonate = null;
  vm.hasTrackToDonate = false;

  $scope.tracks = [];

  function broadcastDonate(track) {
    vm.hasTrackToDonate = true;
    $scope.$broadcast('donate:open', track);
  }

  function donateTrack(track) {

    vm.trackToDonate = track;

    $state.go('fundraisers.one.donate', {fundraiser: fundraiser.id, playlist: fundraiser.playlist});

    // if (!AccessService.isAuthenticated()) {
    //   FB.getLoginStatus(function (response) {
    //     console.log('response');
        // if (response.status === 'connected') {
          //broadcastDonate(track);
        // } else if (response.status === 'not_authorized') {
          // FB.login();
        // } else {
        //   console.log('facebook not sure of status');
        // }
      // });
    // }



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
