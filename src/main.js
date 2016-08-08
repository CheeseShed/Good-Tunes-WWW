'use strict'

var angular = require('angular')
var ngResource = require('angular-resource')
var uiRouter = require('angular-ui-router')
var sanitize = require('angular-sanitize')

angular.module('goodtunes', ['ngResource', 'ui.router'])

// interceptors
angular.module('goodtunes')
  .factory('httpInterceptors', require('./services/interceptors.service'))

// constants
angular.module('goodtunes')
  .constant('config', require('./constants/config.constants'))

// services
angular.module('goodtunes')
  .service('AccessService', require('./services/access.service'))
  .service('StorageService', require('./services/storage.service'))
  .service('playlistService', require('./services/playlist.service'))
  .service('UserService', require('./services/user.service'))
  .service('TrackService', require('./services/track.service'))
  .service('donationService', require('./services/donation.service'))
  .service('fundraiserService', require('./services/fundraiser.service'))
  .service('spotifyService', require('./services/spotify.service'))
  .service('facebookService', require('./services/facebook.service'))

// directives
angular.module('goodtunes')
  .directive('playlists', require('./components/playlists/playlists.directive'))
  .directive('spotifySearch', require('./components/spotify-search/spotify-search.directive'))
  .directive('trackList', require('./components/track-list/track-list.directive'))
  .directive('fundraisersList', require('./components/fundraisers-list/fundraisers-list.directive'))
  .directive('fundraiserTotal', require('./components/fundraiser-total/fundraiser-total.directive'))
  .directive('crowdrise', require('./components/crowdrise/crowdrise.directive'))
  .directive('spotifyPlayer', require('./components/spotify-player/spotify-player.directive'))
  .directive('map', require('./components/map/map.directive'))
  .directive('donateMusicDollar', require('./components/donate-music-dollar/donate-music-dollar.directive'))
  .directive('fundraiserSummary', require('./components/fundraiser-summary/fundraiser-summary.directive'))

// configure the routing and then start the app
angular.module('goodtunes')
  .config(require('./routing'))
  .run(require('./run'))

angular.element(document).ready(function () {
  angular.bootstrap(document.querySelector('[data-good-tunes]'), [
    'goodtunes'
  ], {
    strictDi: true
  })
})
