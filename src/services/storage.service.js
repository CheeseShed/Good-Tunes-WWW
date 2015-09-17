'use strict';

storageService.$inject = ['$window', '$q'];

function storageService($window, $q) {

  let service = {};

  service.setAccessToken = function (accessToken) {
      $window.sessionStorage.setItem('accessToken', accessToken);
  };

  service.getAccessToken = function () {
    $window.sessionStorage.getItem('accessToken');
  };

  return service;
}

module.exports = storageService;
