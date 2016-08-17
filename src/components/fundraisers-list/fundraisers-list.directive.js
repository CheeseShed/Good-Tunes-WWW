'use strict';

function fundraisersListDirective () {
  return {
    templateUrl: '/src/components/fundraisers-list/fundraisers-list.template.html',
    restrict: 'E',
    scope: {
      listItems: '='
    }
  };
}

module.exports = fundraisersListDirective;
