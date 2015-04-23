(() => {

  'use strict';

  /**
  * @name AlertBannerProvider
  * @desc Provider for alert banner
  */
  class AlertBannerProvider {

    constructor() {
      this.className = 'alert-message';
      this.animationDuration = 250;

      this.timeCollapse = 5000;
      this.autoClose = true;

      this.onOpen = () => {};
      this.onClose = () => {};
    }

    /**
     * [setClassName]
     * @param {string} value
     * return AlertBannerProvider
     */
    setClassName(value) {
      if (typeof value !== 'string') {
        throw new Error('String value is provide for parameter className');
      }

      this.className = value;

      return this;
    }

    /**
     * [setTimeCollapse]
     * @param {integer} value
     * return AlertBannerProvider
     */
    setTimeCollapse(value) {
      if (typeof value !== 'number') {
        throw new Error('Number value is provide for parameter timeCollapse');
      }

      this.timeCollapse = value;

      return this;
    }

    /**
     * [setAnimationDuration]
     * @param {integer} value
     * return AlertBannerProvider
     */
    setAnimationDuration(value) {
      if (typeof value !== 'number') {
        throw new Error('Number value is provide for parameter animationDuration');
      }

      this.animationDuration = value;

      return this;
    }

    /**
     * [setAutoClose description]
     * @param {boolean} value
     */
    setAutoClose(value) {
      if (typeof value !== 'boolean') {
        throw new Error('Boolean value is provide for parameter autoClose');
      }

      this.autoClose = value;

      return this;
    }

    /**
     * @name   $get
     * @desc   AlertBanner factory for dispatch events alert
     * @param  {constant}   ALERT_BANNER
     * @param  {$rootScope} $rootScope
     * @ngInject
     */
    $get(ALERT_BANNER, $rootScope) {
      return {
        TYPES: ALERT_BANNER.TYPES,

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
        publish: (params) => {
          $rootScope.$broadcast(ALERT_BANNER.EVENTS.PREFIX + ALERT_BANNER.EVENTS.TYPES.PUBLISH, params);
        },

        /**
         * @name   getClassName
         * @return {string}
         */
        getClassName: () => {
          return this.className;
        },

        /**
         * @name   getAnimationDuration
         * @return {string}
         */
        getAnimationDuration: () => {
          return this.animationDuration;
        },

        /**
         * @name   getDefaultOptions
         * @return {object}
         */
        getDefaultOptions: () => {
          return {
            timeCollapse: this.timeCollapse,
            autoClose: this.autoClose,
            onOpen: this.onOpen,
            onClose: this.onClose
          };
        }
      };
    }
  }

  angular
    .module('angular-alert-banner')
    .provider('AlertBanner', AlertBannerProvider)
  ;

}());