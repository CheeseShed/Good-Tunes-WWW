'use strict';

register.$inject = ['$state', 'UserService', 'StorageService'];

function register($state, userService, storageService) {
  var vm = this;

  vm.submit = function (user) {
    userService.register(user)
      .then(function setAccessToken(profile) {
        storageService.setAccessToken(profile.token)
      })
      .then(function navigateToPlaylists () {
        $state.go('profile');
      })
      .catch(function (err) {
        console.error(err);
      });
  };
}

module.exports = register;
