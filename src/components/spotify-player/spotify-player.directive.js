'use strict'

function addSpotifyPlayerWidget (user, playlist) {
  var widget = document.createElement('iframe')
  widget.src = 'https://embed.spotify.com/?uri=spotify:user:' + user + ':playlist:' + playlist
  widget.setAttribute('frameborder', '0')
  widget.setAttribute('allowtransparency', true)
  document.querySelector('.spotify-player').appendChild(widget)
}

function spotifyPlayerDirective () {
  return {
    templateUrl: '/src/components/spotify-player/spotify-player.template.html',
    restrict: 'E',
    scope: {
      userId: '=',
      playlistId: '='
    },
    link: function (scope) {
      if (!document.querySelector('#spotifyPlayer')) {
        addSpotifyPlayerWidget(scope.userId, scope.playlistId)
      }
    }
  }
}

module.exports = spotifyPlayerDirective
