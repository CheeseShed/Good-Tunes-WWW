'use strict'

var moment = require('moment')

fundraiserTotalDirective.$inject = ['config']

function fundraiserTotalDirective (config) {
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
      var toNumber = function (value) {
        return parseInt(value, 10)
      }

      var calculateAmountRaised = function (raisedAmount, targetAmount) {
        return (toNumber(raisedAmount || 0) / toNumber(targetAmount || 0)) * 100
      }

      scope.targetDate = moment(scope.date).fromNow()
      scope.percentageRaised = calculateAmountRaised(scope.raised, scope.target)

      scope.symbol = config.CURRENCIES[scope.symbol]
    }
  }
}

module.exports = fundraiserTotalDirective
