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
        if (alert('Todo: Donation step here')) {
          scope.trackPressHandler({track: track});
        } else {
          alert('You have to donate in order to add a good tune');
        }
      };

    }
  };
}

module.exports = trackListDirective;
