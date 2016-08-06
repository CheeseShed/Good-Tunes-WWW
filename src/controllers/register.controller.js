/*global FB */

'use strict'

register.$inject = [
  '$log',
  '$state',
  'UserService',
  'StorageService'
]

function register (
  $log,
  $state,
  userService,
  storageService
) {
  var vm = this

  vm.facebookLogin = function () {
    FB.login({scope: 'public_profile,email'})
  }

  vm.submit = function (user) {
    userService.register(user)
      .then(function setAccessToken (profile) {
        storageService.setAccessToken(profile.token)
      })
      .then(function navigateToPlaylists () {
        $state.go('home')
      })
      .catch(function (err) {
        $log(err)
      })
  }
}

module.exports = register
