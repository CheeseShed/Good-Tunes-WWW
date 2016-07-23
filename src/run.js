/* global FB */

'use strict';

runForestRun.$inject = ['$rootScope', '$window', '$state', 'config', 'facebookService', 'AccessService', 'StorageService'];

function runForestRun($rootScope, $window, $state, config, facebookService, AccessService, storageService) {

  var scrollToTop = function () {
    $window.scrollTo(0, 0);
  };

  var stateChangeStartHandler = function (event, toState, toParams) {
    var roles = [];
    var spotifyAuthorisation = getHashParams($window.location.hash);
    var targetStateParams = angular.fromJson(storageService.getItem('spotify_auth_state_params'));

    if (toState.name === 'auth') {
      storageService.removeItem('spotify_auth_state_params');
      storageService.setItem('spotify_authorisation', angular.toJson(spotifyAuthorisation));

      $state.go('fundraisers.one.spotify', targetStateParams);

      return event.preventDefault();
    }

    if (toState.data && toState.data.roles) {
      roles = roles.concat(toState.data.roles);
    }

    if (roles.length) {
      if (!AccessService.isAuthenticated() && !AccessService.isAuthorised(roles)) {
        // stop the transition to the state
        event.preventDefault();

        // go to the login state with the toState and params as a query
        $state.go('login', {toState: toState.name, toParams: toParams}, {location: 'replace'});
      }
    }
  };

  var viewContentLoadingHandler = function () {
    scrollToTop();
  };

  function fbAsyncInit() {
    FB.init({
      appId: config.FACEBOOK_APP_ID,
      status: true,
      xfbml: true,
      version: 'v2.4'
    });

    facebookService.watchAuthenticationStatusChange();
  }

  $rootScope.$on('$stateChangeStart', stateChangeStartHandler);
  $rootScope.$on('$viewContentLoading', viewContentLoadingHandler);

  // facebook start
  $window.fbAsyncInit = fbAsyncInit;

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams(query) {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = query.substring(1);
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

module.exports = runForestRun;
