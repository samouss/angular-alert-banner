/**
 * angular-alert-banner - Angular module for display alert as banner
 * @version v1.0.0
 * @link https://github.com/samouss/angular-alert-banner
 * @license MIT
 */
(function(module) {
try {
  module = angular.module('alert-banner/alert-banner.template.html');
} catch (e) {
  module = angular.module('alert-banner/alert-banner.template.html', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('alert-banner.template.html',
    '<div\n' +
    '  class="{{ ::className }} {{ alert.type }}"\n' +
    '>\n' +
    '  <div class="container">\n' +
    '    <div class="row">\n' +
    '      <p>{{ alert.message }}</p>\n' +
    '      <a\n' +
    '        href=""\n' +
    '        ng-click="close()"\n' +
    '      >X</a>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');
}]);
})();

(function() {

  'use strict';

  /**
  * Angular alert banner
  */
  angular
    .module('angular-alert-banner', [
      'alert-banner/alert-banner.template.html'
    ])
  ;

}());
(function() {

  'use strict';

  /**
   * @name   AlertBannerAttrDirective
   * @desc   <any alert-banner> directive
   * @param  {AlertBanner} AlertBanner
   */
  function AlertBannerAttrDirective(AlertBanner) {

    /**
     * @name   link
     * @desc   link function for alert banner attr directive
     * @param  {$scope}   $scope
     * @param  {$element} $el
     */
    function link($scope, $el) {

      $el[0].addEventListener('click', onClick);

      /**
       * @name   onClick
       */
      function onClick() {
        var options = {};

        options.type = $scope.type;
        options.message = $scope.message;

        if (typeof $scope.autoClose !== 'undefined') {
          options.autoClose = $scope.autoClose;
        }

        if (typeof $scope.timeCollapse !== 'undefined') {
          options.timeCollapse = $scope.timeCollapse;
        }

        if (typeof $scope.onOpen !== 'undefined') {
          options.onOpen = $scope.onOpen;
        }

        if (typeof $scope.onClose !== 'undefined') {
          options.onClose = $scope.onClose;
        }

        $scope.$apply(function() {
          AlertBanner.publish(options);
        });
      }

    }

    return {
      scope: {
        type: '@',
        message: '@',
        autoClose: '@?',
        timeCollapse: '@?',
        onOpen: '&?',
        onClose: '&?'
      },
      restrict: 'A',
      link: link
    };
  }

  angular
    .module('angular-alert-banner')
    .directive('alertBannerAttr', [
      'AlertBanner',
      AlertBannerAttrDirective
    ])
  ;

}());
(function() {

  angular
    .module('angular-alert-banner')
    .constant('ALERT_BANNER', {
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
            $scope.alert.onClose();
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

        $timeout(function() {
          $scope.alert.onOpen();
        }, AlertBanner.getAnimationDuration());

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
(function() {

  'use strict';

   /**
    * @name AlertBannerProvider
    * @desc Provider for alert banner
    */
  function AlertBannerProvider() {

    var AlertBanner = {};

    var className = 'alert-message';
    var animationDuration = 250;

    var timeCollapse = 5000;
    var autoClose = true;
    var onOpen = function() {};
    var onClose = function() {};

    this.setClassName = setClassName;
    this.setAnimationDuration = setAnimationDuration;

    this.setTimeCollapse = setTimeCollapse;
    this.setAutoClose = setAutoClose;

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
     * @name  setAutoClose
     * @param {boolean} value
     * return AlertBannerProvider
     */
    function setAutoClose(value) {
      /* jshint validthis: true */
      if (typeof value !== 'boolean') {
        throw new Error('Boolean value is provide for parameter autoClose');
      }

      autoClose = value;

      return this;
    }

    /**
     * @name   $get
     * @desc   AlertBanner factory for dispatch events alert
     * @param  {constant}   ALERT_BANNER
     * @param  {$rootScope} $rootScope
     */
    $get.$inject = ['ALERT_BANNER', '$rootScope'];
    function $get(ALERT_BANNER, $rootScope) {

      AlertBanner.TYPES = ALERT_BANNER.TYPES;

      AlertBanner.publish = publish;
      AlertBanner.getClassName = getClassName;
      AlertBanner.getAnimationDuration = getAnimationDuration;

      AlertBanner.getDefaultOptions = getDefaultOptions;

      return AlertBanner;

      /**
       * @name   publish
       * @desc   Publish events to alert controller
       * @param  {object} params
       * @param  {object} params.type
       * @param  {object} params.message
       */
      function publish(params) {
        $rootScope.$broadcast(ALERT_BANNER.EVENTS.PREFIX + ALERT_BANNER.EVENTS.TYPES.PUBLISH, params);
      }

      /**
       * @name   getClassName
       * @return {string}
       */
      function getClassName() {
        return className;
      }

      /**
       * @name   getAnimationDuration
       * @return {string}
       */
      function getAnimationDuration() {
        return animationDuration;
      }

      /**
       * @name   getDefaultOptions
       * @return {object}
       */
      function getDefaultOptions() {
        return {
          timeCollapse: timeCollapse,
          autoClose: autoClose,
          onOpen: onOpen,
          onClose: onClose
        };
      }

    }

  }

  angular
    .module('angular-alert-banner')
    .provider('AlertBanner', AlertBannerProvider)
  ;

}());