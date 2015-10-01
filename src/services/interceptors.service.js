'use strict';

httpInterceptors.$inject = ['$q', '$injector', '$window', 'config'];

function httpInterceptors($q, $injector, $window, config) {
  var API_URL = config.API_URL;

  return {
    request: function (config) {
      var token = $window.sessionStorage.getItem('access_token');

      config.headers = config.headers || {};

      if (config.url.indexOf(API_URL) === 0) {
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
      }

      return config;
    },
    response: function (response) {
      return response;
    },
    responseError: function (response) {
      let $state = $injector.get('$state');

      if (response.status === 401) {
        $state.go('login');
      }
      // todo: get not found redirection working
      // else if (response.status === 404) {
      //   $state.go('404', {errorCode: response.status}, {location: 'replace'});
      // }

      return $q.reject(response);
    }
  }
}

module.exports = httpInterceptors;
