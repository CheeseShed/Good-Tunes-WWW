'use strict';

PlaylistsController.$inject = ['playlists', '$state', 'PlaylistService'];

function PlaylistsController(playlists, $state, PlaylistService) {
  var vm = this;

  vm.playlists = playlists;

  vm.create = function (data) {
    PlaylistService.create(data)
      .then(function (playlist) {
        $state.go('playlists.one', {playlist: playlist.id});
      })
      .catch(function (err) {
        console.error(err);
      });
  }
}

module.exports = PlaylistsController;
