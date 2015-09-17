'use strict';

var angular = require('angular');
require('angular-resource');
require('angular-ui-router');

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

// directives
app.directive('playlists', require('./components/playlists/playlists.directive'));

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
        templateUrl: '/src/views/base.html',
        data: {

        }
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
      .state('playlists', {
        url: '/playlists',
        templateUrl: '/src/views/playlists.html',
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
      .state('playlists.playlist', {
        url: '/:playlist',
        templateUrl: '/src/views/playlists.playlist.html',
        controller: require('./controllers/playlist.controller'),
        controllerAs: 'playlist',
        resolve: {
          playlist: ['TrackService', '$stateParams', function (TrackService, $stateParams) {
            return TrackService.readAll({playlist: $stateParams.playlist})
          }]
        }
      })
      .state('playlists')
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
