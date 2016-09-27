'use strict';

function thankYouDirective () {
  return {
    restrict: 'E',
    scope: {
      name: '=',
      track: '=',
      fundraiser: '='
    },
    templateUrl: '/components/thank-you/thank-you.template.html'
  };
}

module.exports = thankYouDirective;
