'use strict';

function donateMusicDollarDirective () {
  return {
    replace: true,
    restrict: 'E',
    scope: {
      fundraiser: '=',
      playlist: '='
    },
    templateUrl: '/components/donate-music-dollar/donate-music-dollar.template.html'
  };
}

module.exports = donateMusicDollarDirective;
