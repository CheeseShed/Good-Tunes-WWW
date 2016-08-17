'use strict';

function spotifyPlayerDirective () {
  return {
    templateUrl: '/src/components/spotify-player/spotify-player.template.html',
    restrict: 'E',
    scope: {
      userId: '=',
      playlistId: '='
    },
    link: function (scope) {
      if (!!scope.userId && !!scope.playlistId) {
        addSpotifyPlayerWidget(scope.userId, scope.playlistId);
      }
    }
  };

  function addSpotifyPlayerWidget (user, playlist) {
    const widget = document.createElement('iframe');
    widget.src = `https://embed.spotify.com/?uri=spotify:user:${user}:playlist:${playlist}`;
    widget.setAttribute('frameborder', '0');
    widget.setAttribute('allowtransparency', true);
    document.querySelector('.spotify-player').appendChild(widget);
  }
}

module.exports = spotifyPlayerDirective;
