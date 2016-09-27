'use strict';

routing.$inject = [
  '$locationProvider',
  '$urlRouterProvider',
  '$stateProvider',
  '$httpProvider'
];

function routing (
  $locationProvider,
  $urlRouterProvider,
  $stateProvider,
  $httpProvider
) {
  // $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      controller: require('./controllers/home.controller'),
      controllerAs: 'home',
      templateUrl: '/views/base.html',
      resolve: {
        fundraisers: ['fundraiserService', function (fundraiserService) {
          return fundraiserService.readAll();
        }]
      },
      data: {
        og: {
          title: 'Good Tunes',
          type: 'website',
          url: 'http://www.goodtunes.org',
          site_name: 'Good Tunes',
          description: 'Donate music to your friends raising money for charity',
          image: 'http://www.goodtunes.org/src/images/good-tunes.png'
        }
      }
    })
    .state('about', {
      url: '/wtf',
      templateUrl: '/views/about.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: require('./controllers/access.controller'),
      controllerAs: 'access',
      params: {
        toState: 'home',
        toParams: {}
      },
      data: {
        pageTitle: 'Login'
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: require('./controllers/register.controller'),
      controllerAs: 'register',
      data: {
        pageTitle: 'Register'
      }
    })
    .state('fundraisers', {
      template: '<ui-view />',
      abstract: true
    })
    .state('fundraisers.one', {
      url: '/fundraisers/:fundraiser',
      templateUrl: '/views/fundraisers.one.html',
      controller: require('./controllers/fundraiser.controller'),
      controllerAs: 'fundraiser',
      resolve: {
        fundraiser: ['$stateParams', 'fundraiserService', function ($stateParams, fundraiserService) {
          return fundraiserService.readOne({id: $stateParams.fundraiser, populate: 'user'});
        }]
      },
      data: {
        hideOverviewPanel: false,
        og: {
          title: 'Good Tunes',
          type: 'website',
          url: 'http://www.goodtunes.org',
          site_name: 'Good Tunes',
          description: 'Donate music to your friends raising money for charity'
        }
      }
    })
    .state('fundraisers.one.edit', {
      url: '/edit',
      views: {
        '@fundraisers': {
          templateUrl: '/views/fundraisers.one.edit.html',
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
    .state('fundraisers.one.why', {
      url: '/why',
      views: {
        'fundraiser@fundraisers.one': {
          templateUrl: '/views/fundraisers.one.why.html'
        }
      },
      data: {
        hideOverviewPanel: true
      }
    })
    .state('fundraisers.one.playlist', {
      url: '/playlist',
      views: {
        'fundraiser@fundraisers.one': {
          templateUrl: '/views/fundraisers.one.playlist.html',
          controller: require('./controllers/fundraiser-playlist.controller'),
          controllerAs: 'playlist',
          resolve: {
            playlist: ['fundraiser', '$stateParams', 'playlistService', function (fundraiser, $stateParams, playlistService) {
              return playlistService.readOne({id: fundraiser.playlist});
            }]
          }
        }
      },
      data: {
        hideOverviewPanel: true
      }
    })
    .state('fundraisers.one.add', {
      url: '/add?q',
      views: {
        'fundraiser@fundraisers.one': {
          templateUrl: '/views/fundraisers.playlist.add.html',
          controller: require('./controllers/search.controller'),
          controllerAs: 'search'
        }
      },
      data: {
        hideOverviewPanel: true
      },
      reloadOnSearch: false
    })
    .state('fundraisers.one.donate', {
      url: '/donate?trackToDonate',
      views: {
        'fundraiser@fundraisers.one': {
          templateUrl: '/views/fundraisers.playlist.donate.html',
          controller: require('./controllers/donate.controller'),
          controllerAs: 'donate'
        }
      },
      data: {
        roles: [20],
        hideOverviewPanel: true
      }
    })
    .state('fundraisers.one.thankyou', {
      url: '/thank-you',
      views: {
        'fundraiser@fundraisers.one': {
          templateUrl: '/views/fundraisers.thankyou.html',
          controller: require('./controllers/thankyou.controller'),
          controllerAs: 'thanks'
        }
      },
      data: {
        hideOverviewPanel: true
      }
    })
    .state('fundraisers.one.spotify', {
      url: '/spotify',
      views: {
        'fundraiser@fundraisers.one': {
          templateUrl: '/views/fundraisers.spotify.html',
          controller: require('./controllers/spotify.controller'),
          controllerAs: 'spotify'
        }
      },
      data: {
        roles: [20],
        isOwner: true
      }
    })
    .state('fundraisers.one.map', {
      url: '/map',
      views: {
        'fundraiser@fundraisers.one': {
          templateUrl: '/views/fundraisers.map.html'
        }
      },
      data: {
        hideOverviewPanel: true
      }
    })
    .state('auth', {
      url: '/auth/spotify',
      templateUrl: '/views/auth.spotify.html'
    })
    .state('notFound', {
      url: '/404',
      templateUrl: '/views/404.html'
    });

  $urlRouterProvider.otherwise('/');

  $httpProvider.interceptors.push('httpInterceptors');
}

module.exports = routing;
