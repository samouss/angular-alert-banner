(function() {

  /**
   * [AppController description]
   * @param {[type]} AlertBanner [description]
   */
  function AppController(AlertBanner) {

    var vm = this;

    vm.TYPES = AlertBanner.TYPES;

    vm.display = display;
    vm.displayWithCallback = displayWithCallback;

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

    /**
     * @name   displayWithCallback
     * @param  {string} type
     * @param  {string} message
     */
    function displayWithCallback(type, message) {
      AlertBanner.publish({
        type: type,
        message: message,
        onOpen: function() {
          console.log('Callback on open');
        },
        onClose: function() {
          console.log('Callback on close');
        }
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