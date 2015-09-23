'use strict';

function trackListDirective() {
  return {
    templateUrl: '/src/components/track-list/track-list.template.html',
    restrict: 'E',
    scope: {
      tracks: '=',
      emptyListMessage: '@emptyListMessage'
    }
  };
}

module.exports = trackListDirective;
