'use strict';

accessController.$inject = [
  '$log',
  '$state',
  '$stateParams',
  'AccessService',
  'StorageService',
  'facebookService'
];

function accessController (
  $log,
  $state,
  $stateParams,
  AccessService,
  StorageService,
  facebookService
) {
  const vm = this;

  setup();

  function setup () {
    vm.facebookLogin = facebookLogin;
  }

  function navigateToState (user) {
    $state.go($state.params.toState, $state.params.toParams);
  }

  function storeUserDetails (user) {
    StorageService.setItem('access_level', user.access_level);
    StorageService.setItem('access_token', user.access_token);
    StorageService.setItem('user_id', user.id);
  }

  function facebookLogin () {
    facebookService.login()
      .then(function (response) {
        StorageService.setItem('facebook', angular.toJson(response));
      })
      .then(facebookService.getInfo)
      .then(function (response) {
        var payload = {
          id: response.id,
          name: response.name,
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          link: response.link,
          picture: response.picture.data.url,
          verified: response.verified
        };

        return AccessService.facebookLogin(payload);
      })
      .then(function (user) {
        storeUserDetails(user);
      })
      .then(navigateToState)
      .catch((err) => {
        $log.log(err);
      });
  }
}

module.exports = accessController;
