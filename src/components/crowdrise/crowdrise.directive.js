'use strict';

crowdriseDirective.$inject = ['config', '$window'];

function crowdriseDirective(config, $window) {
  return {
    restrict: 'E',
    templateUrl: '/src/components/crowdrise/crowdrise.template.html',
    scope: {
      account: '='
    },
    link: function (scope, elem) {
      var crowdriseWidgetId = 'crowdrise' + scope.account;
      var hasDonated = false;

      var addCrowdriseWidget = function () {
        var crowdriseScript;

        if (document.querySelector('#' + crowdriseWidgetId)) {
          return;
        }

        crowdriseScript = document.createElement('script');
        crowdriseScript.id = crowdriseWidgetId;
        crowdriseScript.src = config.CROWDRISE_URL + scope.account + '/?callback=crowdriseCallback';
        crowdriseScript.async = true;
        document.querySelector('.crowdrise-widget').appendChild(crowdriseScript);

        addCrowdriseCallback();
        donateTrack();
      };

      function addCrowdriseCallback() {
        $window.crowdriseCallback = function (response) {
          if (!hasDonated) {
            scope.$emit('donate:complete', response);
          }
        };
      }

      function donateTrack() {
        scope.$emit('donate:addtrack');
      }

      addCrowdriseWidget();
    }
  };
}

module.exports = crowdriseDirective;
