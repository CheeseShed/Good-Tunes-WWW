'use strict';

accessController.$inject = ['$state', '$stateParams', 'AccessService', 'StorageService', 'facebookService'];

function accessController($state, $stateParams, AccessService, StorageService, facebookService) {
  let vm = this;

  console.log('params', $stateParams);

  vm.login = login;
  vm.facebookLogin = facebookLogin;

  function navigateToState(user) {
    $state.go($state.params.toState, $state.params.toParams);
  }

  function storeUserDetails(user) {
    StorageService.setItem('access_level', user.access_level);
    StorageService.setItem('access_token', user.access_token);
    StorageService.setItem('user_id', user.id);
  }

  function login(credentials) {
    AccessService.login(credentials)
      .then(function (user) {
        storeUserDetails(user);
        return user;
      })
      .then(navigateToState)
      .catch(function (err) {
        console.error(err);
      });
  }

  function facebookLogin() {
    facebookService.login()
      .then(function (response) {
        StorageService.setItem('facebook', JSON.stringify(response));
      })
      .then(facebookService.getInfo)
      .then(function (response) {
        let payload = {
          id: response.id,
          name: response.name,
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          link: response.link,
          picture: response.picture.data.url,
          verified: response.verified
        };

        return AccessService.facebookLogin(payload)
      })
      .then(function (user) {
        storeUserDetails(user)
      })
      .then(navigateToState)
      .catch(function (err) {
        console.error(err);
      });
  }
}

module.exports = accessController;
