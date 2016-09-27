'use strict';

function fundraiserSummaryDirective () {
  return {
    restrict: 'E',
    templateUrl: '/components/fundraiser-summary/fundraiser-summary.template.html',
    scope: {
      title: '=',
      charity: '=',
      name: '=',
      id: '='
    }
  };
}

module.exports = fundraiserSummaryDirective;
