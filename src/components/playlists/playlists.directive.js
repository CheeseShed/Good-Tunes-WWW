'use strict';

function playlistsDirective() {
  return {
    templateUrl: '/src/components/playlists/playlists.template.html',
    restrict: 'E',
    scope: {
      items: '='
    }
  };
}

module.exports = playlistsDirective;
