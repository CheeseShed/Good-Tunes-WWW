'use strict';

//todo: when the state loads check stateParams to see if there is a query and automatically search for the query

spotifySearchController.$inject = ['$scope', '$location', 'spotifyService'];

function spotifySearchController($scope, $location, spotifyService) {
  var vm = this;

  function searchSpotify(search) {
    var query = search.q;

    spotifyService.search(query)
      .then(function (tracks) {
        $scope.tracks = tracks;
      })
      .then(function () {
        $location.search({q: query})
      })
      .catch(function (err) {
        console.err(err);
      });
  };

  function setup() {
    vm.search = searchSpotify;
  };

  setup();
}

module.exports = spotifySearchController;
