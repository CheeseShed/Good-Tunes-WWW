'use strict'

playlistService.$inject = ['$resource', 'config']

function playlistService ($resource, config) {

  var PATH = config.API_URL + '/playlists/:id'
  var service = {}

  service.$resource = $resource(PATH, {id: '@id'}, {
    create: {
      url: config.API_URL + '/playlists',
      method: 'POST',
      withCredentials: true
    },
    readAll: {
      url: config.API_URL + '/playlists',
      isArray: true,
      withCredentials: true
    }
  })

  service.create = function (data) {
    return service.$resource.create(data).$promise
  }

  service.readAll = function (data) {
    return service.$resource.readAll(data).$promise
  }

  service.readOne = function (data) {
    return service.$resource.get(data).$promise
  }

  return service
}

module.exports = playlistService
