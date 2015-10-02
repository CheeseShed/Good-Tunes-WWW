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
      const crowdriseWidgetId = 'crowdrise' + scope.account;

      let addCrowdriseWidget = function () {
        let crowdriseScript;

        if (document.querySelector('#' + crowdriseWidgetId)) {
          return;
        }

        crowdriseScript = document.createElement('script');
        crowdriseScript.id = crowdriseWidgetId;
        crowdriseScript.src = config.CROWDRISE_URL + scope.account + '/';
        crowdriseScript.async = true;
        document.querySelector('.crowdrise-widget').appendChild(crowdriseScript);
      };

      function addCrowdriseCallback() {
        $window.crowdriseCallback = function (response) {
          scope.$emit('donate:complete', response);
        };
      }

      // scope.$on('donate:open', function (event, track) {
        // console.log(event, track)
        addCrowdriseWidget();
        addCrowdriseCallback();
      // });
    }
  };
}

module.exports = crowdriseDirective;
