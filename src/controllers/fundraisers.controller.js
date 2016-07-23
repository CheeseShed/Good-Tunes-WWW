'use strict'

fundraisersController.$inject = ['fundraisers']

function fundraisersController (fundraisers) {
  this.fundraisers = fundraisers
}

module.exports = fundraisersController
