'use strict';

runForestRun.$inject = ['$rootScope', '$window', '$state', 'config', 'facebookService', 'AccessService'];

function runForestRun($rootScope, $window, $state, config, facebookService, AccessService) {

  var scrollToTop = function () {
    $window.scrollTo(0, 0);
  };

  var stateChangeStartHandler = function (event, toState, toParams) {
    var roles = [];

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
  }

  var viewContentLoadingHandler = function () {
    scrollToTop();
  };

  function fbAsyncInit() {
    FB.init({
      appId: config.FACEBOOK_APP_ID,
      status: true,
      xfbml: false,
      version: 'v2.4'
    });

    facebookService.watchAuthenticationStatusChange();
  }

  $rootScope.$on('$stateChangeStart', stateChangeStartHandler);
  $rootScope.$on('$viewContentLoading', viewContentLoadingHandler);

  // facebook start
  $window.fbAsyncInit = fbAsyncInit;

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

module.exports = runForestRun;
