'use strict';

playlistController.$inject = ['playlist'];

function playlistController(playlistData) {
  var vm = this;

  function setup() {
    vm.playlist = playlistData.data.playlist;
    vm.tracks = playlistData.data.tracks;
  }

  setup();
}

module.exports = playlistController;
