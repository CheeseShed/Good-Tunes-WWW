'use strict';

function donateMusicDollarDirective () {
  return {
    restrict: 'E',
    templateUrl: '/components/donate-music-dollar/donate-music-dollar.template.html',
    scope: {
      fundraiser: '=',
      playlist: '='
    }
  };
}

module.exports = donateMusicDollarDirective;
