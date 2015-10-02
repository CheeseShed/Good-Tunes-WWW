'use strict';

authService.$inject = ['$resource', 'config', 'StorageService'];

function authService($resource, config, storageService) {
  let service = {};

  service.$resource = $resource(config.API_URL, {}, {
    facebookLogin: {

    }
  });


  return service;
}

module.exports = authService;
