(function() {

  'use strict';

  /**
   * @name   AlertBanner
   * @desc   <alert-banner> directive
   * @param  {constant}    ALERT
   * @param  {$timeout}    $timeout
   * @param  {$rootScope}  $rootScope
   * @param  {AlertBanner} AlertBanner
   */
  function AlertBannerDirective(ALERT, $timeout, $rootScope, AlertBanner) {

    /**
     * @name   link
     * @desc   link function for alert banner directive
     * @param  {$scope}   $scope
     * @param  {$element} $el
     */
    function link($scope, $el) {

      var _config = { autoClose: true };
      var queue = [];

      $scope.alert = {};
      $scope.className = AlertBanner.getClassName();

      $scope.close = close;

      $scope.$on(ALERT.EVENTS.PREFIX + ALERT.EVENTS.TYPES.PUBLISH, onMessage);

      /**
       * Close alert message
       * @return {void}
       */
      function close() {
        if ($el[0].querySelector('.' + AlertBanner.getClassName()).classList.contains('active')) {
          clearQueue();
          $el[0].querySelector('.' + AlertBanner.getClassName()).classList.remove('active');
          $timeout(function() {
            $scope.alert = {};
          }, AlertBanner.getAnimationDuration());
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

        $el[0].querySelector('.' + AlertBanner.getClassName()).classList.add('active');

        if ($scope.alert.autoClose) {
          queue.push($timeout(function() {
            close();
          }, AlertBanner.getAnimationDuration()));
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

    return {
      restrict: 'E',
      templateUrl: '/partials/components/alert-banner.template.html',
      link: link
    };
  }

  angular
    .module('angular-alert-banner')
    .directive('alertBanner', [
      'ALERT',
      '$timeout',
      '$rootScope',
      'AlertBanner',
      AlertBannerDirective
    ])
  ;

}());