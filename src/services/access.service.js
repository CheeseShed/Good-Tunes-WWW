'use strict';

accessService.$inject = ['$resource', 'config'];

function accessService($resource, config) {

  let service = {};

  service.$resource = $resource(config.API_URL, {}, {
    login: {
      method: 'POST',
      url: config.API_URL + '/login'
    }
  });

  service.login = function (data) {
    return this.$resource.login(data).$promise;
  }

  return service;
}

module.exports = accessService;
