'use strict';

fundraisers.$inject = ['$resource', 'config'];

function fundraisers ($resource, config) {
  var API_PATH = config.API_URL + '/fundraisers/:id';

  var service = {};

  service.$resource = $resource(API_PATH, {id: '@id'}, {
    create: {
      method: 'POST',
      withCredentials: true
    },
    patch: {
      method: 'PATCH',
      withCredentials: true
    },
    update: {
      method: 'PUT',
      withCredentials: true
    }
  });

  service.create = function (data) {
    return this.$resource.create(data).$promise;
  };

  service.readAll = function (data) {
    return this.$resource.query(data).$promise;
  };

  service.readOne = function (data) {
    return this.$resource.get(data).$promise;
  };

  service.patch = function (data) {
    return this.$resource.update(data).$promise;
  };

  return service;
}

module.exports = fundraisers;
