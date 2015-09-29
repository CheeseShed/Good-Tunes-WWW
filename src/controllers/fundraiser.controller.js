'use strict';

fundraiserController.$inject = ['fundraiser'];

function fundraiserController(fundraiser) {
  this.fundraiser = fundraiser;
  console.log(fundraiser);
}

module.exports = fundraiserController;
