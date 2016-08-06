'use strict'

donateController.$inject = [
  'fundraiser',
  '$state',
  '$scope',
  'TrackService',
  'AccessService',
  'StorageService'
]

function donateController (
  fundraiser,
  $state,
  $scope,
  TrackService,
  AccessService,
  storageService
) {
  var vm = this

  vm.fundraiser = fundraiser
  vm.person = fundraiser.user.name.toLowerCase().indexOf('ben') > -1 ? 'ben' : 'jade'
  vm.gender = vm.person === 'ben' ? 'he' : 'she'
  vm.trackToDonate = null
  vm.hasTrackToDonate = false

  $scope.tracks = []

  function donateTrack (track) {
    sessionStorage.setItem('trackToDonate', angular.toJson(track))

    $state.go('fundraisers.one.donate', {
      fundraiser: fundraiser.id,
      playlist: fundraiser.playlist
    })
  }

  function setup () {
    vm.donateTrack = donateTrack
    // $scope.$on('donate:complete', donationCompleteHandler)
  }

  setup()
}

module.exports = donateController
