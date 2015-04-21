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
       * @desc   Publish    dispatch event to handle directive
       * @param  {object}   params
       * @param  {string}   params.type
       * @param  {string}   params.message
       * @param  {integer}  params.timeCollapse
       * @param  {boolean}  params.autoClose
       * @param  {function} params.onOpen
       * @param  {function} params.onClose
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