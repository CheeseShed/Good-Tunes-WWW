'use strict';

fundraiserPlaylistController.$inject = ['$scope', 'fundraiser', 'playlist'];

function fundraiserPlaylistController($scope, fundraiser, playlist) {
  var vm = this;

  function setup() {
    vm.playlist = playlist.data.playlist;
    vm.tracks = playlist.data.tracks;
    vm.fundraiser = fundraiser;
  }

  setup();
}

module.exports = fundraiserPlaylistController;
