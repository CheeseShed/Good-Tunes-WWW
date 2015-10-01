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
app.service('playlistService', require('./services/playlist.service'));
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
app.directive('fundraiserForm', require('./components/fundraiser-form/fundraiser-form.directive'));
app.directive('crowdrise', require('./components/crowdrise/crowdrise.directive'));


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
        template: '<ui-view />',
        abstract: true
      })
      .state('fundraisers.all', {
        url: '/fundraisers',
        views: {
          '@fundraisers': {
            templateUrl: '/src/views/fundraisers.html',
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
          }
        }
      })
      .state('fundraisers.one', {
        url: '/fundraisers/:fundraiser',
        views: {
          '@fundraisers': {
            templateUrl: '/src/views/fundraisers.one.html',
            controller: require('./controllers/fundraiser.controller'),
            controllerAs: 'fundraiser',
            resolve: {
              fundraiser: ['$stateParams', 'fundraiserService', function ($stateParams, fundraiserService) {
                return fundraiserService.readOne({id: $stateParams.fundraiser, populate: 'user'});
              }]
            }
          }
        }
      })
      .state('fundraisers.one.edit', {
        url: '/edit',
        views: {
          '@fundraisers': {
            templateUrl: '/src/views/fundraisers.one.edit.html',
            controller: require('./controllers/fundraiser.controller'),
            controllerAs: 'fundraiser',
            resolve: {
              fundraiser: ['$stateParams', 'fundraiserService', function ($stateParams, fundraiserService) {
                return fundraiserService.readOne({id: $stateParams.fundraiser});
              }]
            }
          }
        },
        // data: {
        //   roles: [20],
        //   isOwner: true
        // }
      })
      .state('fundraisers.one.playlist', {
        url: '/playlists/:playlist',
        views: {
          '@fundraisers': {
            templateUrl: '/src/views/fundraisers.one.playlist.html',
            controller: require('./controllers/fundraiser-playlist.controller'),
            controllerAs: 'playlist',
            resolve: {
              fundraiser: ['$stateParams', 'fundraiserService', function ($stateParams, fundraiserService) {
                return fundraiserService.readOne({id: $stateParams.fundraiser});
              }],
              playlist: ['$stateParams', 'playlistService', function ($stateParams, playlistService) {
                return playlistService.readOne({id: $stateParams.playlist});
              }]
            }
          }
        }
      })
      .state('fundraisers.one.donate', {
        url: '/playlists/:playlist/donate',
        views: {
          '@fundraisers': {
            templateUrl: '/src/views/playlists.playlist.donate.html',
            controller: require('./controllers/donate.controller'),
            controllerAs: 'donate',
            reloadOnSearch: false
          }
        },
        resolve: {
          fundraiser: ['$stateParams', 'fundraiserService', function ($stateParams, fundraiserService) {
            return fundraiserService.readOne({id: $stateParams.fundraiser});
          }]
        }
      })
      // .state('playlists.one.donate', {
      //   url: '/donate?q',
      //   views: {
      //     '@playlists': {
      //       templateUrl: '/src/views/playlists.playlist.donate.html',
      //       controller: require('./controllers/donate.controller'),
      //       controllerAs: 'donate',
      //       reloadOnSearch: false,
      //       resolve: {
      //         playlistId: ['$stateParams', function ($stateParams) {
      //           return $stateParams.playlist;
      //         }],
      //         searchResults: ['$stateParams', 'spotifyService', function ($stateParams, spotifyService) {
      //           var query = $stateParams.q;
      //           if (query) {
      //             return spotifyService.search(query)
      //           } else {
      //             return false;
      //           }
      //         }]
      //       }
      //     }
      //   }
      // })
      .state('notFound', {
        url: '/404',
        templateUrl: '/src/views/404.html'
      });

      $urlRouterProvider.otherwise('/');

      $httpProvider.interceptors.push('httpInterceptors');
  }]);

app.run(['$rootScope', '$state', 'AccessService', function ($rootScope, $state, AccessService) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    let roles = [];

    if (toState.data && toState.data.roles) {
      roles = roles.concat(toState.data.roles);
    }

    if (roles.length) {
      if (!AccessService.isAuthenticated() && !AccessService.isAuthorised(roles)) {
        console.log('Todo: Not Authorised or Authenticated');
        event.preventDefault();
      }
    }
  });
}]);

angular.element(document).ready(function () {
  angular.bootstrap(document.querySelector('[data-good-tunes]'), ['goodtunes']);
});
