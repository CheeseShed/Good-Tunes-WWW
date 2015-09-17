'use strict';

userService.$inject = ['$resource', 'config'];

function userService($resource, config) {

  const PATH = config.API_URL + '/users/:id';

  let service = {};

  service.$resource = $resource(PATH, {id: '@id'}, {
    register: {
      method: 'POST'
    }
  });

  service.register = function (user) {
    return this.$resource.register(user).$promise;
  };

  service.readOne = function (data) {
    console.log(data);
    return this.$resource.get(data).$promise;
  };

  return service;
}

module.exports = userService;
