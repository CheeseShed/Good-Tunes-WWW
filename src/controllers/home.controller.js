'use strict'

homeController.$inject = ['fundraisers']

function homeController (fundraisers) {
  var vm = this

  var setup = function () {
    vm.fundraisers = fundraisers
    console.log(fundraisers)
  }

  setup()
}

module.exports = homeController
