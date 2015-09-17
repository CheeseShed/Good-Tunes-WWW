'use strict';

var angular = require('angular');

function loginDirective() {
  return {
    templateUrl: '/src/views/login.html',
    replace: true,
    restrict: 'E'
  };
}

module.exports = loginDirective;
