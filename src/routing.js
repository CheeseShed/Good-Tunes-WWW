'use strict';

routing.$inject = ['$locationProvider', '$urlRouterProvider','$stateProvider','$httpProvider'];

function routing($locationProvider, $urlRouterProvider, $stateProvider, $httpProvider) {
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
      controllerAs: 'access',
      params: {
        toState: 'home',
        toParams: {}
      }
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
      data: {
        roles: [20],
        isOwner: true
      }
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
    .state('fundraisers.one.add', {
      url: '/playlists/:playlist/add?q',
      views: {
        '@fundraisers': {
          templateUrl: '/src/views/fundraisers.playlist.add.html',
          controller: require('./controllers/search.controller'),
          controllerAs: 'search',
          reloadOnSearch: false
        }
      },
      resolve: {
        fundraiser: ['$stateParams', 'fundraiserService', function ($stateParams, fundraiserService) {
          return fundraiserService.readOne({id: $stateParams.fundraiser});
        }]
      }
    })
    .state('fundraisers.one.donate', {
      url: '/playlists/:playlist/donate?provider',
      views: {
        '@fundraisers': {
          templateUrl: '/src/views/fundraisers.playlist.donate.html',
          controller: require('./controllers/donate.controller'),
          controllerAs: 'donate'
        }
      },
      resolve: {
        fundraiser: ['$stateParams', 'fundraiserService', function ($stateParams, fundraiserService) {
          return fundraiserService.readOne({id: $stateParams.fundraiser});
        }]
      },
      data: {
        roles: [20]
      }
    })
    .state('fundraisers.one.thankyou', {
      url: '/thank-you',
      views: {
        '@fundraisers': {
          controller: require('./controllers/fundraiser.controller'),
          controllerAs: 'fundraiser',
          templateUrl: '/src/views/fundraisers.thankyou.html'
        }
      },
      resolve: {
        fundraiser: ['$stateParams', 'fundraiserService', function ($stateParams, fundraiserService) {
          return fundraiserService.readOne({id: $stateParams.fundraiser});
        }]
      },
    })
    .state('notFound', {
      url: '/404',
      templateUrl: '/src/views/404.html'
    });

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push('httpInterceptors');
}

module.exports = routing;
