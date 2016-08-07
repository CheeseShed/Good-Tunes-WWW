'use strict'

fundraiserPlaylistController.$inject = ['playlist']

function fundraiserPlaylistController (playlist) {
  const vm = this

  function setup () {
    vm.tracks = playlist.data.tracks
  }

  setup()
}

module.exports = fundraiserPlaylistController
