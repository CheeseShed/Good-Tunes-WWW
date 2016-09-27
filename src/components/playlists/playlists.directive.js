'use strict';

function playlistsDirective () {
  return {
    templateUrl: '/components/playlists/playlists.template.html',
    restrict: 'E',
    scope: {
      items: '='
    }
  };
}

module.exports = playlistsDirective;
