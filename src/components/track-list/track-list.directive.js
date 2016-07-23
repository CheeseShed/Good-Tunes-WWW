'use strict'

function trackListDirective () {
  return {
    templateUrl: '/src/components/track-list/track-list.template.html',
    restrict: 'E',
    scope: {
      tracks: '=', // two way binding
      emptyListMessage: '@', // one way binding
      trackPressHandler: '&', // expression
      showButton: '=?'
    },
    link: function (scope) {
      // add the method addTrack to the scope
      scope.addTrack = function (track) {
        scope.trackPressHandler({track: track})
      }

      scope.showDonateButton = function () {
        // show donate button unless directed specifically not to
        var show = angular.isDefined(scope.showButton) ? scope.showButton : true
        return show
      }
    }
  }
}

module.exports = trackListDirective
