'use strict';

fundraiserPlaylistController.$inject = ['$scope', 'fundraiser', 'playlist'];

function fundraiserPlaylistController($scope, fundraiser, playlist) {
  var vm = this;

  function setup() {
    vm.playlist = playlist.data.playlist;

    console.log('foo!');
    console.log(vm.playlist);
    vm.tracks = playlist.data.tracks;
    console.log(vm.tracks);
    vm.fundraiser = fundraiser;
  }

  setup();
}

module.exports = fundraiserPlaylistController;
