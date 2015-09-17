'use strict';

playlistController.$inject = ['$scope', 'playlist'];

function playlistController($scope, playlist) {
  var vm = this;

  this.playlist = playlist;

  var titles = playlist.map(function (track) {
    return track.spotify_id;
  });

  $scope.titles = titles;

  console.log(titles);
}

module.exports = playlistController;
