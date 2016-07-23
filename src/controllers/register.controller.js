'use strict';

register.$inject = ['$state', 'UserService', 'StorageService'];

function register($state, userService, storageService) {
  var vm = this;

  vm.facebookLogin = function () {
    FB.login(function (response) {
      console.log(response);
    }, {scope: 'public_profile,email'});
  };

  vm.submit = function (user) {
    userService.register(user)
      .then(function setAccessToken(profile) {
        storageService.setAccessToken(profile.token);
      })
      .then(function navigateToPlaylists() {
        $state.go('home');
      })
      .catch(function (err) {
        console.error(err);
      });
  };
}

module.exports = register;
