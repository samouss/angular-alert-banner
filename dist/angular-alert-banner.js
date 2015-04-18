/**
 * angular-alert-banner - Angular module for display alert as banner
 * @version v1.0.0
 * @link https://github.com/samouss/angular-alert-banner
 * @license MIT
 */
(function() {

  'use strict';

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
      }
    })
  ;

}());
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
(function() {

  'use strict';

   /**
    * @name AlertBannerProvider
    * @desc Provider for alert banner
    */
  function AlertBannerProvider() {

    var AlertBanner = {};

    var className = 'alert-message';

    var timeCollapse = 5000;
    var animationDuration = 250;

    this.setClassName = setClassName;
    this.setTimeCollapse = setTimeCollapse;
    this.setAnimationDuration = setAnimationDuration;

    this.$get = $get;

    /**
     * @name  setClassName
     * @param {string} value
     * return AlertBannerProvider
     */
    function setClassName(value) {
      /* jshint validthis: true */
      if (typeof value !== 'string') {
        throw new Error('String value is provide for parameter className');
      }

      className = value;

      return this;
    }

    /**
     * @name  setTimeCollapse
     * @param {string} value
     * return AlertBannerProvider
     */
    function setTimeCollapse(value) {
      /* jshint validthis: true */
      if (typeof value !== 'number') {
        throw new Error('Number value is provide for parameter timeCollapse');
      }

      timeCollapse = value;

      return this;
    }

    /**
     * @name  setAnimationDuration
     * @param {string} value
     * return AlertBannerProvider
     */
    function setAnimationDuration(value) {
      /* jshint validthis: true */
      if (typeof value !== 'number') {
        throw new Error('Number value is provide for parameter animationDuration');
      }

      animationDuration = value;

      return this;
    }

    /**
     * @name   $get
     * @desc   AlertBanner factory for dispatch events alert
     * @param  {constant}   ALERT
     * @param  {$rootScope} $rootScope
     */
    $get.$inject = ['ALERT', '$rootScope'];
    function $get(ALERT, $rootScope) {

      AlertBanner.publish = publish;

      AlertBanner.getClassName = getClassName;
      AlertBanner.getTimeCollapse = getTimeCollapse;
      AlertBanner.getAnimationDuration = getAnimationDuration;

      return AlertBanner;

      /**
       * @name   publish
       * @desc   Publish events to alert controller
       * @param  {object} params
       * @param  {object} params.type
       * @param  {object} params.message
       */
      function publish(params) {
        $rootScope.$broadcast(ALERT.EVENTS.PREFIX + ALERT.EVENTS.TYPES.PUBLISH, params);
      }

      /**
       * @name   getClassName
       * @return {string}
       */
      function getClassName() {
        return className;
      }

      /**
       * @name   getTimeCollapse
       * @return {integer}
       */
      function getTimeCollapse() {
        return timeCollapse;
      }

      /**
       * @name   getAnimationDuration
       * @return {integer}
       */
      function getAnimationDuration() {
        return animationDuration;
      }

    }

  }

  angular
    .module('angular-alert-banner')
    .provider('AlertBanner', AlertBannerProvider)
  ;

}());