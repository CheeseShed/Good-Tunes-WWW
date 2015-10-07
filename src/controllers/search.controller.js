'use strict';

var omit = require('lodash/object/omit');

donateController.$inject = ['fundraiser', '$state', '$scope', 'TrackService', 'AccessService', 'StorageService'];

function donateController(fundraiser, $state, $scope, TrackService, AccessService, storageService) {
  var vm = this;

  vm.fundraiser = fundraiser;
  vm.person = fundraiser.user.name.toLowerCase().indexOf('ben') > -1 ? 'ben' : 'jade';
  vm.gender = vm.person === 'ben' ? 'he' : 'she';
  vm.trackToDonate = null;
  vm.hasTrackToDonate = false;

  $scope.tracks = [];

  function broadcastDonate(track) {
    vm.hasTrackToDonate = true;
    $scope.$broadcast('donate:open', track);
  }

  function donateTrack(track) {

    sessionStorage.setItem('trackToDonate', JSON.stringify(track));

    $state.go('fundraisers.one.donate', {
      fundraiser: fundraiser.id,
      playlist: fundraiser.playlist
    });

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
