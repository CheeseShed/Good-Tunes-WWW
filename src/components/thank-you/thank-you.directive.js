'use strict';

function thankYouDirective() {
  return {
    restrict: 'E',
    scope: {
      name: '=',
      track: '=',
      fundraiser: '='
    },
    templateUrl: '/src/components/thank-you/thank-you.template.html'
  };
}

module.exports = thankYouDirective;
