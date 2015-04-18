(function() {

  /**
   * [AppController description]
   * @param {[type]} AlertBanner [description]
   */
  function AppController(AlertBanner) {
    console.log('AppController');
  }

  angular
    .module('app', [
      'angular-alert-banner'
    ])
    .controller('AppController', [
      'AlertBanner',
      AppController
    ])
  ;

}());