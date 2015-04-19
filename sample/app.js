(function() {

  /**
   * [AppController description]
   * @param {[type]} AlertBanner [description]
   */
  function AppController(AlertBanner) {

    var vm = this;

    vm.display = display;

    /**
     * @name   display
     * @param  {string} message
     */
    function display(message) {
      AlertBanner.publish({
        type: AlertBanner.TYPES.SUCCESS,
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