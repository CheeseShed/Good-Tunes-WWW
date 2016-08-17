'use strict';

trackService.$inject = ['$resource', 'config'];

function trackService ($resource, config) {
  var API_PATH = config.API_URL + '/tracks/:id';

  var service = {};

  service.$resource = $resource(API_PATH, {id: '@id'}, {
    create: {
      url: config.API_URL + '/tracks',
      method: 'POST',
      withCredentials: true
    },
    readAll: {
      url: config.API_URL + '/tracks',
      isArray: true
    }
  });

  service.readAll = function (data) {
    return service.$resource.readAll(data).$promise;
  };

  service.create = function (data) {
    return service.$resource.create(data).$promise;
  };

  return service;
}

module.exports = trackService;
