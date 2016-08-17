'use strict';

thankyouController.$inject = [
  'fundraiser',
  '$window',
  '$document',
  '$state',
  '$stateParams',
  'StorageService'
];

function thankyouController (
  fundraiser,
  $window,
  $document,
  $state,
  $stateParams,
  storageService
) {
  const vm = this;
  const donatedTrack = angular.fromJson(storageService.getItem('trackToDonate'));

  function setup () {
    if (!donatedTrack) {
      navigateToAddState();
    }

    vm.track = donatedTrack.name;
    vm.name = '';
    vm.fundraiser = fundraiser.id;
    clearTrackToDonate();
  }

  function clearTrackToDonate () {
    storageService.removeItem('trackToDonate');
  }

  function navigateToAddState () {
    $state.go('fundraisers.one', {
      fundraiser: $stateParams.fundraiser
    });
  }

  setup();
}

module.exports = thankyouController;
