'use strict';

trackService.$inject = ['$resource', 'config'];

function trackService($resource, config) {
  const PATH = config.API_URL + '/tracks';

  let service = {};

  service.$resource = $resource(PATH, {id: '@id'}, {
    readAll: {
      url: config.API_URL + '/tracks',
      isArray: true
    }
  });

  service.readAll = function (data) {
    console.log(data);
    return service.$resource.readAll(data).$promise;
  };

  return service;
}

module.exports = trackService;
