'use strict';

facebookService.$inject = ['$q'];

function facebookService($q) {
  let service = {};

  service.watchAuthenticationStatusChange = function () {
    FB.Event.subscribe('auth.statusChange', function (response) {
      console.log('statusChange', response);
    });
  };

  service.getLoginStatus = function () {
    let defer = $q.defer();

    FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        defer.resolve(response.authResponse);
      } else if (response.status === 'not_authorized') {
        defer.reject(response.status);
      } else {
        defer.reject(response.status);
      }
    });

    return defer.promise;
  };

  service.getInfo = function () {
    let defer = $q.defer();

    FB.api('/me', {fields: 'id,name,email,first_name,last_name,gender,link,verified,picture'}, function (response) {
      defer.resolve(response);
    });

    return defer.promise;
  };

  service.login = function () {
    let defer = $q.defer();

    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          defer.resolve(response.authResponse);
        } else if (response.status === 'not_authorized' || response.status === 'unknown') {
          FB.login({scope: 'email'});
        } else {
          defer.reject();
        }
    });

    return defer.promise;
  };

  return service;
}

module.exports = facebookService;
