(function() {

  'use strict';

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