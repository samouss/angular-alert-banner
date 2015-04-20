(function() {

  /**
   * [AppController description]
   * @param {[type]} AlertBanner [description]
   */
  function AppController(AlertBanner) {

    var vm = this;

    vm.TYPES = AlertBanner.TYPES;

    vm.display = display;

    /**
     * @name   display
     * @param  {string} type
     * @param  {string} message
     */
    function display(type, message) {
      AlertBanner.publish({
        type: type,
        message: message
      });
    }

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