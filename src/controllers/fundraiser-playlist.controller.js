'use strict';

fundraiserPlaylistController.$inject = ['$scope', 'fundraiser', 'playlist'];

function fundraiserPlaylistController($scope, fundraiser, playlist) {
  var vm = this;

  function setup() {
    vm.playlist = playlist.data.playlist;
    vm.tracks = playlist.data.tracks;
    vm.fundraiser = fundraiser;
    vm.person = fundraiser.user.name.toLowerCase().indexOf('ben') > -1 ? 'ben' : 'jade';
    vm.gender = vm.person === 'ben' ? 'he' : 'she';
  }

  setup();
}

module.exports = fundraiserPlaylistController;
