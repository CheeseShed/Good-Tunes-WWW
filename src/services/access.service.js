'use strict';

const includes = require('lodash/collection/includes');

accessService.$inject = ['$resource', 'config', 'StorageService'];

function accessService($resource, config, storageService) {

  let service = {};

  service.$resource = $resource(config.API_URL, {}, {
    login: {
      method: 'POST',
      url: config.API_URL + '/login'
    },
    facebookLogin: {
      method: 'POST',
      url: config.API_URL + '/auth/facebook'
    }
  });

  service.login = function (data) {
    return this.$resource.login(data).$promise;
  };

  service.facebookLogin = function (data) {
    return this.$resource.facebookLogin(data).$promise;
  };

  service.isAuthenticated = function () {
    return !!storageService.getItem('access_token');
  };

  service.isAuthorised = function (roles) {
    const accessLevel = storageService.getItem('access_level') || null;
    return includes(roles, accessLevel);
  };

  return service;
}

module.exports = accessService;
