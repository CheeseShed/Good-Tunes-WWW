'use strict';

function trackListDirective() {
  return {
    templateUrl: '/src/components/track-list/track-list.template.html',
    restrict: 'E',
    scope: {
      tracks: '=', // two way binding
      emptyListMessage: '@', // one way binding
      trackPressHandler: '&' // expression
    },
    link: function (scope) {

      // add the method addTrack to the scope
      scope.addTrack = function (track) {
        scope.trackPressHandler({track: track});
      };

    }
  };
}

module.exports = trackListDirective;
