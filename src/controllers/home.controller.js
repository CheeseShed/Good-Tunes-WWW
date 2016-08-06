'use strict'

homeController.$inject = ['fundraisers']

function homeController (fundraisers) {
  var vm = this

  var setup = function () {
    vm.fundraisers = fundraisers
  }

  setup()
}

module.exports = homeController
