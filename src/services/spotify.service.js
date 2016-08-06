'use strict'

var pick = require('lodash/object/pick')

spotifyService.$inject = ['$http', '$q', 'config']

function spotifyService ($http, $q, config) {
  var SPOTIFY_API_URL = config.SPOTIFY_API_URL
  var service = {}

  service.search = function (query) {
    return $q(function (resolve, reject) {
      $http.get(SPOTIFY_API_URL + '/search?q=' + query + '&type=artist,track&limit=50&market=GB')
        .then(function (response) {
          return response.data.tracks.items
        })
        .then(function (tracks) {
          return tracks.map(function (track) {
            return pick(track, [
              'album',
              'artists',
              'duration_ms',
              'external_urls',
              'href',
              'id',
              'name',
              'popularity',
              'preview_url',
              'type',
              'uri'
            ])
          })
        })
        .then(function (tracks) {
          resolve(tracks)
        })
        .catch(function (err) {
          reject(err)
        })
    })
  }

  return service
}

module.exports = spotifyService
