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

      AlertBanner.TYPES = ALERT.TYPES;

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