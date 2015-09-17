'use strict';

LoginController.$inject = ['$scope', '$state', 'AccessService', 'StorageService'];

function LoginController($scope, $state, AccessService, StorageService) {
  var vm = this;

  vm.credentials = {};

  vm.login = function () {
    AccessService
      .login(vm.credentials)
      .then(function (user) {
        StorageService.setAccessToken(user.token);
      })
      .then(function () {
        $state.go('home');
      })
      .catch(function (err) {
        console.error(err);
      });
  };
};

module.exports = LoginController;
