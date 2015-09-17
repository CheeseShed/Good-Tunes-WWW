'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var spotify = new SpotifyWebApi();
  var spotifyUri = 'https://accounts.spotify.com/authorize';
  var params;

  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  function authorise() {
    var clientId = 'aec58f40d71f457593360e42e08c2e18';
    var responseType = 'token';
    var redirectUri = encodeURIComponent('http://localhost:3000/');
    var scope = '';

    localStorage.setItem('spotify_state', Date.now());

    location.href = spotifyUri
      + '?client_id=' + clientId
      + '&response_type=' + responseType
      + '&redirect_uri=' + redirectUri
      + '&state=' + localStorage.getItem('spotify_state');
  }

  function isAuthorised () {
    return localStorage.getItem('spotify_state');

    // return params.access_token && params.state === storedState;
  }

  params = getHashParams();

  var searchForm = document.querySelector('#spotifySearch');

  // if (isAuthorised()) {
    // spotify.setAccessToken(params.access_token);

    searchForm.classList.add('spotify-search--active');

    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var q = searchForm.querySelector('#q').value;

      spotify.searchTracks(q)
        .then(function (result) {
          var tracks = result.tracks.items.map(function (item) {
            return {
              name: item.name,
              id: item.id,
              uri: item.uri,
              href: item.href,
              artists: item.artists
            }
          });

          console.log(tracks);
        })
        .catch(function (err) {
          console.error(err);
        });
    });
  // }
});
