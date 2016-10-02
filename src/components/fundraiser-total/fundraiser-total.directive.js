'use strict';

const moment = require('moment');

fundraiserTotalDirective.$inject = ['config'];

function fundraiserTotalDirective ({ CURRENCIES }) {
  function toNumber (value) {
    return parseInt(value, 10);
  }

  function calculateAmountRaised (raisedAmount, targetAmount) {
    return (toNumber(raisedAmount || 0) / toNumber(targetAmount || 0)) * 100;
  }

  function link (scope) {
    const { date, raised, symbol } = scope;
    let target = scope.target;

    if (raised > target) {
      target += target * 0.25;
    }

    scope.targetDate = moment(date).fromNow();
    scope.percentageRaised = calculateAmountRaised(raised, target);
    scope.symbol = CURRENCIES[symbol];
  }

  return {
    link,
    replace: true,
    restrict: 'E',
    scope: {
      name: '=',
      symbol: '=',
      target: '=',
      raised: '=',
      date: '='
    },
    templateUrl: '/components/fundraiser-total/fundraiser-total.template.html'
  };
}

module.exports = fundraiserTotalDirective;
