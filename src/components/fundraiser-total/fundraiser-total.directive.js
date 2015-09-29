'use strict';

const moment = require('moment');

function fundraiserTotalDirective() {
  return {
    templateUrl: '/src/components/fundraiser-total/fundraiser-total.template.html',
    restrict: 'E',
    scope: {
      name: '=',
      symbol: '=',
      target: '=',
      raised: '=',
      date: '='
    },
    link: function (scope) {

      let toNumber = function (value) {
        return parseInt(value, 10);
      };

      let calculateAmountRaised = function (raisedAmount, targetAmount) {
        return (toNumber(raisedAmount || 0) / toNumber(targetAmount || 0)) * 100;
      };

      scope.targetDate = moment(scope.date).fromNow(true);
      scope.percentageRaised = calculateAmountRaised(scope.raised, scope.target);
    }
  };
}

module.exports = fundraiserTotalDirective;
