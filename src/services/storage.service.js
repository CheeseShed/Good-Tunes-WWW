'use strict';

storageService.$inject = ['$window', '$q'];

function storageService($window, $q) {

  let service = {};

  service.setItem = function (key, value) {
    $window.sessionStorage.setItem(key, value);
  };

  service.getItem = function (key) {
    $window.sessionStorage.getItem(key);
  };

  service.getAccessToken = function () {
    $window.sessionStorage.getItem('access_token');
  };

  return service;
}

module.exports = storageService;
