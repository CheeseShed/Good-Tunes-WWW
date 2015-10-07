'use strict';

var has = require('lodash/object/has');

donateController.$inject = ['fundraiser', '$q', '$scope', '$state', '$stateParams', 'StorageService', 'TrackService', 'donationService'];

function donateController(fundraiser, $q, $scope, $state, $stateParams, storageService, trackService, donationService) {
  var vm = this;

  function setup() {
    vm.fundraiser = fundraiser;
    vm.trackToDonate = JSON.parse(storageService.getItem('trackToDonate'));
    vm.person = fundraiser.user.name.toLowerCase().indexOf('ben') > -1 ? 'ben' : 'jade';
    vm.gender = vm.person === 'ben' ? 'he' : 'she';

    if (!vm.trackToDonate) {
      navigateToAddState();
    }

    $scope.$on('donate:complete', donationCompleteHandler);
  }

  function donateTrack(track) {
    console.log(track)
    //trackService.create()
  }

  function donationCompleteHandler(event, donation) {
    // should do a check here
    // should move crowdrise specific code into it's own controller if other donation providers are added
    // donateTrack(vm.trackToDonate, donation);
      console.log(vm.trackToDonate);



    var track = {
      playlist: vm.fundraiser.playlist,
      name: vm.trackToDonate.name,
      spotify_id: vm.trackToDonate.id,
      duration_ms: vm.trackToDonate.duration_ms,
      link: vm.trackToDonate.href,
      artists: vm.trackToDonate.artists
    };

    trackService
      .create(track)
      .then(function (response) {
        return donationService.create({
          track: response.id,
          fundraiser: vm.fundraiser.id,
          amount: donation.amount
        });
      })
      .then(function (response) {
        $state.go('fundraisers.one.thankyou', {fundraisers: $stateParams.fundraiser, playlist: $stateParams.playlist});
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function navigateToAddState() {
    $state.go('fundraisers.one.add', {
      fundraiser: $stateParams.fundraiser,
      playlist: $stateParams.playlist
    });
  }

  setup();
}

module.exports = donateController;
