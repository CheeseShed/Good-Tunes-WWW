'use strict';

accessController.$inject = ['$state', 'AccessService', 'StorageService'];

function accessController($state, AccessService, StorageService) {
  let vm = this;

  vm.login = login;

  function login(credentials) {
    AccessService.login(credentials)
      .then(function (user) {
        StorageService.setAccessToken(user.token);
        return user;
      })
      .then(function (user) {
        $state.go('home');
      })
      .catch(function (err) {
        console.error(err);
      });
  }
}

module.exports = accessController;
