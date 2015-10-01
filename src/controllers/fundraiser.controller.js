'use strict';

fundraiserController.$inject = ['fundraiser', 'fundraiserService', 'playlistService'];

function fundraiserController(fundraiser, fundraiserService, playlistService) {
  var vm = this;
  this.fundraiser = fundraiser;

  this.update = function (model) {
    this.fundraiser.$update(function (model) {
      console.log(model);
    });
  };

  this.fetchPlaylist = function (id) {
    playlistService.readOne({id: id})
      .then(function (playlist) {
        vm.playlist = playlist.data.playlist;
        vm.tracks = playlist.data.tracks;
      });
  };
}

module.exports = fundraiserController;
