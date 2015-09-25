'use strict';

const omit = require('lodash/object/omit');

donateController.$inject = ['playlistId', 'searchResults', '$scope', 'TrackService'];

function donateController(playlistId, searchResults, $scope, TrackService) {
  let vm = this;

  $scope.tracks = [];

  function donateTrack(track) {

    track = omit(track, '$$hashKey');
    track.playlist = playlistId;

    TrackService
      .create(track)
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function setup() {
    vm.donateTrack = donateTrack;

    if (searchResults) {
      $scope.tracks = searchResults;
    }
  }

  setup();
}

module.exports = donateController;
