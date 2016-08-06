'use strict'

function spotifySearchDirective () {
  return {
    templateUrl: '/src/components/spotify-search/spotify-search.template.html',
    restrict: 'E',
    controller: require('./spotify-search.controller'),
    controllerAs: 'spotify'
  }
}

module.exports = spotifySearchDirective
