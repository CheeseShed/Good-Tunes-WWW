'use strict';

function addSpotifyPlayerWidget (runnerId) {
  var widget = document.createElement('iframe');
  widget.src = 'http://liveresults.nyrr.org/e/NY2015#/tracker/' + runnerId;
  widget.id = 'map';
  widget.setAttribute('frameborder', '0');
  widget.setAttribute('allowtransparency', true);
  document.querySelector('.map').appendChild(widget);
}

function mapDirective () {
  return {
    restrict: 'E',
    templateUrl: '/components/map/map.template.html',
    scope: {
      runnerId: '='
    },
    link: function (scope) {
      if (!document.querySelector('#map')) {
        addSpotifyPlayerWidget(scope.runnerId);
      }
    }
  };
}

module.exports = mapDirective;
