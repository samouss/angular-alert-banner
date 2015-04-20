(function() {

  'use strict';

  /**
   * @name   AlertBanner
   * @desc   <alert-banner> directive
   * @param  {constant}    ALERT_BANNER
   * @param  {$timeout}    $timeout
   * @param  {$rootScope}  $rootScope
   * @param  {AlertBanner} AlertBanner
   */
  function AlertBannerDirective(ALERT_BANNER, $timeout, $rootScope, AlertBanner) {

    /**
     * @name   link
     * @desc   link function for alert banner directive
     * @param  {$scope}   $scope
     * @param  {$element} $el
     */
    function link($scope, $el) {

      var _options = AlertBanner.getDefaultOptions();
      var queue = [];

      $scope.alert = {};
      angular.copy(_options, $scope.alert);
      $scope.className = AlertBanner.getClassName();

      $scope.close = close;

      $scope.$on(ALERT_BANNER.EVENTS.PREFIX + ALERT_BANNER.EVENTS.TYPES.PUBLISH, onMessage);

      /**
       * Close alert message
       * @return {void}
       */
      function close() {
        if ($el[0].querySelector('.' + AlertBanner.getClassName()).classList.contains('active')) {
          clearQueue();
          $el[0].querySelector('.' + AlertBanner.getClassName()).classList.remove('active');
          $timeout(function() {
            angular.copy(_options, $scope.alert);
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

        angular.extend($scope.alert, data);

        $el[0].querySelector('.' + AlertBanner.getClassName()).classList.add('active');

        if ($scope.alert.autoClose) {
          queue.push($timeout(function() {
            close();
          }, $scope.alert.timeCollapse));
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
      templateUrl: 'alert-banner.template.html',
      link: link
    };
  }

  angular
    .module('angular-alert-banner')
    .directive('alertBanner', [
      'ALERT_BANNER',
      '$timeout',
      '$rootScope',
      'AlertBanner',
      AlertBannerDirective
    ])
  ;

}());