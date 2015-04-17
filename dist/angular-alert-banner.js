/**
 * angular-alert-banner - Angular module for display alert as banner
 * @version v1.0.0
 * @link https://github.com/samouss/angular-alert-banner
 * @license MIT
 */
(function() {

  /**
  * Angular alert banner
  */
  angular
    .module('angular-alert-banner', [
    ])
  ;

}());
(function() {

  angular
    .module('angular-alert-banner')
    .constant('ALERT', {
      CLASS_NAME: 'alert-message',
      EVENTS: {
        PREFIX: 'alert:',
        TYPES: {
          PUBLISH: 'publish'
        }
      },
      TYPES: {
        SUCCESS: 'success',
        INFO: 'info',
        ERROR: 'error'
      },
      DURATIONS: {
        ANIMATION: 250,
        TIMING: 5000
      }
    })
  ;

}());
(function() {

  function alert(ALERT, $timeout, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: '/partials/components/alert.template.html',
      link: function($scope, $el) {

        var _config = { autoClose: true },
            queue = [];

        $scope.alert = {};
        $scope.className = ALERT.CLASS_NAME;

        $scope.close = close;

        $scope.$on(ALERT.EVENTS.PREFIX + ALERT.EVENTS.TYPES.PUBLISH, onMessage);

        /**
         * Close alert message
         * @return {void}
         */
        function close() {
          if ($el[0].querySelector('.' + ALERT.CLASS_NAME).classList.contains('active')) {
            clearQueue();
            $el[0].querySelector('.' + ALERT.CLASS_NAME).classList.remove('active');
            $timeout(function() {
              $scope.alert = {};
            }, ALERT.DURATIONS.ANIMATION);
          }
        }

        /**
         * Callback for event alert:publish
         * @param  {event}  event
         * @param  {object} data
         * @return {void}
         */
        function onMessage(event, data) {
          clearQueue();

          angular.extend($scope.alert, _config);
          angular.extend($scope.alert, data);

          $el[0].querySelector('.' + ALERT.CLASS_NAME).classList.add('active');

          if ($scope.alert.autoClose) {
            queue.push($timeout(function() {
              close();
            }, ALERT.DURATIONS.TIMING));
          }
        }

        /**
         * Clear queue for alert timer
         * @return {void}
         */
        function clearQueue() {
          queue.forEach(function(promise) {
            $timeout.cancel(promise);
          });
        }
      }
    };
  }

  angular
    .module('angular-alert-banner')
    .directive('alert', [
      'ALERT',
      '$timeout',
      '$rootScope',
      alert
    ])
  ;

}());
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