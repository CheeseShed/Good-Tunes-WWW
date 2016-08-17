'use strict';

donationService.$inject = ['$resource', 'config'];

function donationService ($resource, config) {
  var API_PATH = config.API_URL + '/donations/:id';

  var service = {};

  service.$resource = $resource(API_PATH, {id: '@id'}, {
    create: {
      method: 'POST',
      withCredentials: true
    }
  });

  service.create = function (data) {
    return this.$resource.create(data).$promise;
  };

  return service;
}

module.exports = donationService;
