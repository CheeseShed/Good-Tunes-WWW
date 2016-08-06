'use strict'

thankyouController.$inject = ['$window', '$scope', '$state', '$stateParams', 'StorageService']

function thankyouController ($window, $scope, $state, $stateParams, storageService) {
  var vm = this

  var setup = function () {
    vm.donatedTrack = JSON.parse(storageService.getItem('donatedTrack'))
    vm.sharingUrl = 'http://www.goodtunes.com/fundraisers/' + $stateParams.fundraiser

    if (!vm.donatedTrack) {
      navigateToAddState()
    } else {
      clearTrackToDonate()
      enableSharingPlugins()
    }
  }

  function clearTrackToDonate () {
    storageService.removeItem('donatedTrack')
  }

  function enableSharingPlugins () {
    $window.FB.XFBML.parse(document.querySelector('.fundraiser-details'))
  }

  function navigateToAddState () {
    $state.go('fundraisers.one', {
      fundraiser: $stateParams.fundraiser
    })
  }

  setup()
}

module.exports = thankyouController
