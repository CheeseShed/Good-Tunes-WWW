'use strict'

var Spotify = require('JMPerez/spotify-web-api-js')

spotifyController.$inject = ['fundraiser', '$window', '$scope', '$stateParams', '$q', 'config', 'StorageService', 'playlistService']

function spotifyController (fundraiser, $window, $scope, $stateParams, $q, config, storageService, playlistService) {
  var vm = this
  var spotifyAuthorisation = JSON.parse(storageService.getItem('spotify_authorisation'))
  var accessToken
  var storedState = storageService.getItem('spotify_auth_state')
  var sapi
  var SPOTIFY_USER_ID = fundraiser.spotify_user_id
  var SPOTIFY_PLAYLIST_ID = fundraiser.spotify_playlist_id

  if (spotifyAuthorisation) {
    accessToken = spotifyAuthorisation.access_token
  }

  vm.hasAccessToken = false
  vm.profile = {}
  vm.tracks = []
  vm.error = ''

  vm.requestAuthorisation = function () {
    var path = 'https://accounts.spotify.com/authorize'
    var clientId = config.SPOTIFY_CLIENT_ID
    var state = generateRandomString(16)

    storageService.setItem('spotify_auth_state_params', JSON.stringify($stateParams))
    storageService.setItem('spotify_auth_state', state)

    path += '?client_id=' + encodeURIComponent(clientId)
    path += '&response_type=token'
    path += '&redirect_uri=' + encodeURIComponent(config.SPOTIFY_REDIRECT_URI)
    path += '&state=' + encodeURIComponent(state)
    path += '&scope=' + encodeURIComponent(config.SPOTIFY_SCOPES)

    $window.location = path
  }

  vm.syncPlaylistHandler = function () {
    playlistService
      .readOne({id: fundraiser.playlist})
      .then(makeArrayOfSpotifyURIs)
      .then(replaceTracksInPlaylist)
      .then(getPlaylistTracks)
      .catch(function (err) {
        vm.error = err.message
      })
  }

  function makeArrayOfSpotifyURIs (playlist) {
    return playlist.data.tracks.map(function (track) {
      return 'spotify:track:' + track.spotify_id
    })
  }

  function replaceTracksInPlaylist (tracks) {
    return $q(function (resolve, reject) {
      sapi.replaceTracksInPlaylist(SPOTIFY_USER_ID, SPOTIFY_PLAYLIST_ID, tracks, function (err) {
        if (err) {
          return reject(err)
        }

        return resolve()
      })
    })
  }

  function getPlaylistTracks () {
    sapi.getPlaylist(SPOTIFY_USER_ID, SPOTIFY_PLAYLIST_ID, function (err, playlist) {
      if (err) {
        return console.error(err)
      }

      var tracks = playlist.tracks.items.map(function (item) {
        return {name: item.track.name}
      })

      updateTracksList(tracks)
    })
  }

  function updateTracksList (tracks) {
    $scope.$apply(function () {
      vm.tracks = tracks
    })
  }

  function setupSpotify () {
    sapi = new Spotify()
    sapi.setAccessToken(accessToken)
    sapi.getMe(function (err, profile) {
      if (err) {
        return console.error(err)
      }

      $scope.$apply(function () {
        vm.profile.id = profile.id
        vm.profile.image = profile.images[0].url
      })

      getPlaylistTracks()
    })
  }

  function start () {
    if (accessToken && (spotifyAuthorisation.state === storedState)) {
      storageService.removeItem('spotify_auth_state')
      vm.hasAccessToken = true

      setupSpotify()

    } else {
      vm.hasAccessToken = false
    }
  }

  start()
}

function generateRandomString (length) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
};

module.exports = spotifyController
