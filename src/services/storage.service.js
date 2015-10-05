'use strict';

storageService.$inject = ['$window', '$q'];

function storageService($window, $q) {

  var service = {};

  service.setItem = function (key, value) {
    return $window.sessionStorage.setItem(key, value);
  };

  service.getItem = function (key) {
    return $window.sessionStorage.getItem(key);
  };

  service.getAccessToken = function () {
    return $window.sessionStorage.getItem('access_token');
  };

  return service;
}

module.exports = storageService;
