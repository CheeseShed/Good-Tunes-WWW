'use strict';

donateController.$inject = [
  'fundraiser',
  '$scope',
  '$state',
  '$stateParams',
  'StorageService',
  'TrackService',
  'donationService'
];

function donateController (
  fundraiser,
  $scope,
  $state,
  $stateParams,
  storageService,
  trackService,
  donationService
) {
  const vm = this;
  const { playlist } = fundraiser;

  function setup () {
    vm.fundraiser = fundraiser;
    $scope.$on('crowdrise:complete', crowdriseCompleteHandler);
  }

  function createTrack (track) {
    const {
      href,
      id,
      name
    } = track;

    return trackService.create({
      href,
      name,
      playlist,
      spotify_id: id
    });
  }

  function createDonation (track, fundraiser, amount) {
    return donationService.create({
      amount,
      fundraiser,
      track
    });
  }

  function crowdriseCompleteHandler (event, donation) {
    const { amount } = donation;
    const trackToDonate = angular.fromJson(storageService.getItem('trackToDonate'));

    createTrack(trackToDonate)
      .then((response) => createDonation(response.id, fundraiser.id, amount))
      .then((response) => {
        navigateToState('fundraisers.one.thankyou');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function navigateToState (stateName) {
    $state.go(stateName, {
      fundraiser: $stateParams.fundraiser
    });
  }

  setup();
}

module.exports = donateController;
