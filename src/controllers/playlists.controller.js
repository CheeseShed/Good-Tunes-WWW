'use strict';

PlaylistsController.$inject = ['playlists', 'PlaylistService'];

function PlaylistsController(playlists, PlaylistService) {
  var vm = this;

  vm.playlists = playlists;

  vm.create = function (data) {
    PlaylistService.create(data)
      .then(function (playlist) {
        console.log(playlist);
      })
      .catch(function (err) {
        console.error(err);
      });
  }
}

module.exports = PlaylistsController;
