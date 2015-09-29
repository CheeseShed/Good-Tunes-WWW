'use strict';

fundraisersController.$inject = ['fundraisers'];

function fundraisersController(fundraisers) {
  this.fundraisers = fundraisers;
  console.log(fundraisers);
}

module.exports = fundraisersController;
