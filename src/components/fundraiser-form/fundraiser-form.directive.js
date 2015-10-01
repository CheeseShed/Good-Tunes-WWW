'use strict';

function fundraiserFormDirective() {
  return {
    restrict: 'E',
    templateUrl: '/src/components/fundraiser-form/fundraiser-form.template.html',
    scope: {
      model: '='
    }
    // controller: require('./fundraiser-form.controller'),
    // controllerAs: 'form'
  };
}

module.exports = fundraiserFormDirective;
