'use strict';

const angular = require('angular');
const ngResource = require('angular-resource');
const uiRouter = require('angular-ui-router');
const sanitize = require('angular-sanitize');

const app = angular.module('goodtunes', ['ngResource', 'ui.router']);

// interceptors
app.factory('httpInterceptors', require('./services/interceptors.service'));

// constants
app.constant('config', require('./constants/config.constants'));

// services
app.service('AccessService', require('./services/access.service'));
app.service('StorageService', require('./services/storage.service'));
app.service('playlistService', require('./services/playlist.service'));
app.service('UserService', require('./services/user.service'));
app.service('TrackService', require('./services/track.service'));
app.service('donationService', require('./services/donation.service'));
app.service('fundraiserService', require('./services/fundraiser.service'));
app.service('spotifyService', require('./services/spotify.service'));
app.service('facebookService', require('./services/facebook.service'));

// directives
app.directive('playlists', require('./components/playlists/playlists.directive'));
app.directive('spotifySearch', require('./components/spotify-search/spotify-search.directive'));
app.directive('trackList', require('./components/track-list/track-list.directive'));
app.directive('fundraisersList', require('./components/fundraisers-list/fundraisers-list.directive'));
app.directive('fundraiserTotal', require('./components/fundraiser-total/fundraiser-total.directive'));
app.directive('fundraiserForm', require('./components/fundraiser-form/fundraiser-form.directive'));
app.directive('crowdrise', require('./components/crowdrise/crowdrise.directive'));

// configure routing
app.config(require('./routing'));

// start the app
app.run(require('./run'));

angular.element(document).ready(function () {
  angular.bootstrap(document.querySelector('[data-good-tunes]'),[
    'goodtunes'
  ], {
    strictDi: true
  });
});
