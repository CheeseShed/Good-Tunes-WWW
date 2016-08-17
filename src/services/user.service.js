'use strict';

userService.$inject = ['$resource', 'config'];

function userService ($resource, config) {
  var PATH = config.API_URL + '/users/:id';

  var service = {};

  service.$resource = $resource(PATH, {id: '@id'}, {
    register: {
      method: 'POST'
    }
  });

  service.register = function (user) {
    return this.$resource.register(user).$promise;
  };

  service.readOne = function (data) {
    return this.$resource.get(data).$promise;
  };

  return service;
}

module.exports = userService;
