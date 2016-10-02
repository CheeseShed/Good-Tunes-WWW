'use strict';

function fundraiserSummaryDirective () {
  return {
    replace: true,
    restrict: 'E',
    scope: {
      title: '=',
      charity: '=',
      name: '=',
      id: '='
    },
    templateUrl: '/components/fundraiser-summary/fundraiser-summary.template.html'
  };
}

module.exports = fundraiserSummaryDirective;
