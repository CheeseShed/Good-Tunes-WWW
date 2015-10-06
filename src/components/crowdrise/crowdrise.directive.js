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

      var addCrowdriseWidget = function () {
        var crowdriseScript;

        if (document.querySelector('#' + crowdriseWidgetId)) {
          return;
        }

        crowdriseScript = document.createElement('script');
        crowdriseScript.id = crowdriseWidgetId;
        crowdriseScript.src = config.CROWDRISE_URL + scope.account + '/';
        crowdriseScript.async = true;
        document.querySelector('.crowdrise-widget').appendChild(crowdriseScript);

        addCrowdriseCallback();
      };

      function addCrowdriseCallback() {
        $window.crowdriseCallback = function (response) {
          console.log(response);
          scope.$emit('donate:complete', response);
        };
      }

      addCrowdriseWidget();
    }
  };
}

module.exports = crowdriseDirective;
