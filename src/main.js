'use strict';

var angular = require('angular');
require('angular-resource');
require('angular-ui-router');
require('angular-sanitize');

var app = angular.module('goodtunes', ['ngResource', 'ui.router']);

// interceptors
app.factory('httpInterceptors', require('./services/interceptors.service'));

// constants
app.constant('config', require('./constants/config.constants'));

// services
app.service('AccessService', require('./services/access.service'));
app.service('StorageService', require('./services/storage.service'));
app.service('PlaylistService', require('./services/playlist.service'));
app.service('UserService', require('./services/user.service'));
app.service('TrackService', require('./services/track.service'));
app.service('fundraiserService', require('./services/fundraiser.service'));
app.service('spotifyService', require('./services/spotify.service'));

// directives
app.directive('playlists', require('./components/playlists/playlists.directive'));
app.directive('spotifySearch', require('./components/spotify-search/spotify-search.directive'));
app.directive('trackList', require('./components/track-list/track-list.directive'));
app.directive('fundraisersList', require('./components/fundraisers-list/fundraisers-list.directive'));
app.directive('fundraiserTotal', require('./components/fundraiser-total/fundraiser-total.directive'));

app.config([
  '$locationProvider',
  '$urlRouterProvider',
  '$stateProvider',
  '$httpProvider',
  function ($locationProvider, $urlRouterProvider, $stateProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('base', {
        abstract: true,
        templateUrl: '/src/views/base.html'
      })
      .state('home', {
        url: '/',
        templateUrl: '/src/views/base.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/src/views/login.html',
        controller: require('./controllers/access.controller'),
        controllerAs: 'access'
      })
      .state('register', {
        url: '/register',
        templateUrl: '/src/views/register.html',
        controller: require('./controllers/register.controller'),
        controllerAs: 'register'
      })
      .state('fundraisers', {
        url: '/fundraisers',
        templateUrl: '/src/views/fundraisers.html',
        // abstract: true,
        controller: require('./controllers/fundraisers.controller'),
        controllerAs: 'fundraisers',
        resolve: {
          fundraisers: ['fundraiserService', function (fundraiserService) {
            return fundraiserService.readAll({
              skip: 0,
              limit: 20
            });
          }]
        }
      })
      .state('fundraisers.one', {
        url: '/:id',
        views: {
          '@fundraisers': {
            templateUrl: '/src/views/fundraisers.one.html',
            controller: require('./controllers/fundraiser.controller'),
            controllerAs: 'fundraiser',
            resolve: {
              fundraiser: ['$stateParams', 'fundraiserService', function ($stateParams, fundraiserService) {
                console.log('fundraiser');
                return fundraiserService.readOne({id: $stateParams.id});
              }]
            }
          }
        }
      })
      .state('playlists', {
        templateUrl: '/src/views/playlists.html',
        abstract: true,
        controller: require('./controllers/playlists.controller'),
        controllerAs: 'playlists',
        resolve: {
          playlists: ['PlaylistService', function (PlaylistService) {
            return PlaylistService.readAll({
              skip: 0,
              limit: 20,
              sort: 1
            });
          }]
        }
      })
      .state('playlists.all', {
        url: '/playlists',
        templateUrl: '/src/views/playlists.list.html'
      })
      .state('playlists.create', {
        url: '/playlists/create',
        templateUrl: '/src/views/playlists.create.html'
      })
      .state('playlists.one', {
        url: '/playlists/:playlist',
        views: {
          '@playlists': {
            templateUrl: '/src/views/playlists.playlist.html',
            controller: require('./controllers/playlist.controller'),
            controllerAs: 'playlist',
            bindToController: true,
          }
        },
        resolve: {
          playlist: ['PlaylistService', '$stateParams', function (PlaylistService, $stateParams) {
            return PlaylistService.readOne({id: $stateParams.playlist})
          }]
        }
      })
      .state('playlists.one.donate', {
        url: '/donate?q',
        views: {
          '@playlists': {
            templateUrl: '/src/views/playlists.playlist.donate.html',
            controller: require('./controllers/donate.controller'),
            controllerAs: 'donate',
            reloadOnSearch: false,
            resolve: {
              playlistId: ['$stateParams', function ($stateParams) {
                return $stateParams.playlist;
              }],
              searchResults: ['$stateParams', 'spotifyService', function ($stateParams, spotifyService) {
                var query = $stateParams.q;
                if (query) {
                  return spotifyService.search(query)
                } else {
                  return false;
                }
              }]
            }
          }
        }
      })
      .state('notFound', {
        url: '/404',
        templateUrl: '/src/views/404.html'
      });

      $urlRouterProvider.otherwise('/');

      $httpProvider.interceptors.push('httpInterceptors');
  }]);

angular.element(document).ready(function () {
  angular.bootstrap(document.querySelector('[data-good-tunes]'), ['goodtunes']);
});
