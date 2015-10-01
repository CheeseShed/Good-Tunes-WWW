'use strict';

accessController.$inject = ['$state', 'AccessService', 'StorageService'];

function accessController($state, AccessService, StorageService) {
  let vm = this;

  vm.login = login;

  function login(credentials) {
    AccessService.login(credentials)
      .then(function (user) {
        StorageService.setItem('access_level', user.access_level);
        StorageService.setItem('access_token', user.access_token);
        StorageService.setItem('user_id', user.id);
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
