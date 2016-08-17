'use strict';

crowdriseDirective.$inject = [
  'config',
  '$window'
];

function crowdriseDirective (config, $window) {
  return {
    restrict: 'E',
    templateUrl: '/src/components/crowdrise/crowdrise.template.html',
    scope: {
      id: '='
    },
    link
  };

  function link (scope, elem) {
    const id = scope.id;
    const url = `${config.CROWDRISE_URL}${id}/?callback=crowdriseCallback`;

    if (id && !document.querySelector(`#crowdrise${id}`)) {
      addCrowdriseWidget(id, url);
    }

    function addCrowdriseWidget (id, url) {
      const script = document.createElement('script');
      script.src = url;
      script.id = 'crowdrise' + id;
      script.async = true;
      document.querySelector('.crowdrise-widget').appendChild(script);
      $window.crowdriseCallback = crowdriseCallback;
    }

    function crowdriseCallback (response) {
      scope.$emit('crowdrise:complete', response);
    }
  }
}

module.exports = crowdriseDirective;
