(function() {

  angular
    .module('angular-alert-banner')
    .service('AlertService', [
      'ALERT',
      '$rootScope',
      AlertService
    ])
  ;

  /**
   * Alert service for dispatch events alert
   * @param {object}     ALERT
   * @param {$rootScope} $rootScope
   */
  function AlertService(ALERT, $rootScope) {

    var vm = this;

    vm.TYPES = ALERT.TYPES;

    vm.publish = publish;

    /**
     * Publish events to alert controller
     * @param  {object} params
     * @param  {object} params.type
     * @param  {object} params.message
     * @return {void}
     */
    function publish(params) {
      $rootScope.$broadcast(ALERT.EVENTS.PREFIX + ALERT.EVENTS.TYPES.PUBLISH, params);
    }
  }

}());