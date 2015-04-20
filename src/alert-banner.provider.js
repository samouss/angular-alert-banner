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
    var autoClose = true;

    this.setClassName = setClassName;
    this.setTimeCollapse = setTimeCollapse;
    this.setAnimationDuration = setAnimationDuration;
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
       * @name   getDefaultOptions
       * @return {object}
       */
      function getDefaultOptions() {
        return {
          timeCollapse: timeCollapse,
          animationDuration: animationDuration,
          autoClose: autoClose
        };
      }

    }

  }

  angular
    .module('angular-alert-banner')
    .provider('AlertBanner', AlertBannerProvider)
  ;

}());