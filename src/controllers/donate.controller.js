'use strict';

donateController.$inject = ['fundraiser', '$q', '$scope', '$state', '$stateParams', 'StorageService', 'TrackService', 'donationService'];

function donateController(fundraiser, $q, $scope, $state, $stateParams, storageService, trackService, donationService) {
  var vm = this;

  function setup() {
    vm.fundraiser = fundraiser;
    vm.trackToDonate = JSON.parse(storageService.getItem('trackToDonate'));
    vm.person = fundraiser.user.name.toLowerCase().indexOf('ben') > -1 ? 'ben' : 'jade';
    vm.gender = vm.person === 'ben' ? 'he' : 'she';

    if (!vm.trackToDonate) {
      navigateToState('fundraisers.one.add');
    }

    $scope.$on('donate:addtrack', donationAddTrackHandler);
    $scope.$on('donate:complete', donationCompleteHandler);
  }

  function donationAddTrackHandler(event, track) {
    // Todo: Move crowdrise specific code to it's own controller for future provider expansion
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
        storageService.removeItem('trackToDonate');
        storageService.setItem('donatedTrack', JSON.stringify(response));
        console.log('track donated');
        console.log(response);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function donationCompleteHandler(event, donation) {
    var donatedTrack = JSON.parse(storageService.getItem('donatedTrack'));

    donationService.create({
        track: donatedTrack.id,
        fundraiser: vm.fundraiser.id,
        amount: donation.amount
      })
      .then(function () {
        navigateToState('fundraisers.one.thankyou');
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function navigateToState(stateName) {
    $state.go(stateName, {
      fundraiser: $stateParams.fundraiser,
      playlist: $stateParams.playlist
    });
  }

  setup();
}

module.exports = donateController;
