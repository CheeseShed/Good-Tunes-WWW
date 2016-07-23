'use strict'

storageService.$inject = ['$window', '$q']

function storageService ($window, $q) {

  var service = {}

  service.setItem = function (key, value) {
    return $window.sessionStorage.setItem(key, value)
  }

  service.getItem = function (key) {
    return $window.sessionStorage.getItem(key)
  }

  service.removeItem = function (key) {
    return $window.sessionStorage.removeItem(key)
  }

  service.getAccessToken = function () {
    return $window.sessionStorage.getItem('access_token')
  }

  service.storeItem = function (key, value) {
    return $window.localStorage.setItem(key, value)
  }

  service.getStoredItem = function (key) {
    return $window.localStorage.getItem(key)
  }

  return service
}

module.exports = storageService
