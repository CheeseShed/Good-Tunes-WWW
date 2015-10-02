'use strict';

donateController.$inject = ['fundraiser'];

function donateController(fundraiser) {
  console.log('donate controller');

  this.fundraiser = fundraiser;
}

module.exports = donateController;
