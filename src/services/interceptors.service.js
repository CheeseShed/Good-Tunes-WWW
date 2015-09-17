'use strict';

httpInterceptors.$inject = ['$q', '$injector', '$window'];

function httpInterceptors($q, $injector, $window) {
  return {
    request: function (config) {
      var token = $window.sessionStorage.getItem('accessToken');

      config.headers = config.headers || {};

      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
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
