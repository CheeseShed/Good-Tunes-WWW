'use strict';

function fundraiserFormDirective () {
  return {
    restrict: 'E',
    templateUrl: '/components/fundraiser-form/fundraiser-form.template.html',
    scope: {
      model: '='
    },
    bindToController: true,
    controller: require('./fundraiser-form.controller'),
    controllerAs: 'ctrl',
  };
}

module.exports = fundraiserFormDirective;
