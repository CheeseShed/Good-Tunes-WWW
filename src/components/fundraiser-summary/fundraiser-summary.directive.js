'use strict';

function fundraiserSummaryDirective () {
  return {
    replace: true,
    restrict: 'E',
    scope: {
      title: '=',
      summary: '=',
      id: '='
    },
    templateUrl: '/components/fundraiser-summary/fundraiser-summary.template.html'
  };
}

module.exports = fundraiserSummaryDirective;
