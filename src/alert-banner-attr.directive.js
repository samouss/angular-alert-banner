(() => {

  'use strict';

  /**
   * @name   AlertBannerAttrDirective
   * @desc   <any alert-banner> directive
   * @param  {AlertBanner} AlertBanner
   * @ngInject
   */
  class AlertBannerAttrDirective {

    constructor(AlertBanner) {
      this.restrict = 'A';
      this.scope = {
        type: '@',
        message: '@',
        autoClose: '@?',
        timeCollapse: '@?',
        onOpen: '&?',
        onClose: '&?'
      };

      this._AlertBanner = AlertBanner;

      this._options = this._AlertBanner.getDefaultOptions();
      this.queue = [];
    }

    /**
     * @name   onClick
     */
    onClick() {
      let options = {};

      options.type = this._scope.type;
      options.message = this._scope.message;

      if (typeof this._scope.autoClose !== 'undefined') {
        options.autoClose = this._scope.autoClose;
      }

      if (typeof this._scope.timeCollapse !== 'undefined') {
        options.timeCollapse = this._scope.timeCollapse;
      }

      if (typeof this._scope.onOpen !== 'undefined') {
        options.onOpen = this._scope.onOpen;
      }

      if (typeof this._scope.onClose !== 'undefined') {
        options.onClose = this._scope.onClose;
      }

      this._scope.$apply(() => {
        this._AlertBanner.publish(options);
      });
    }

    /**
     * @name   link
     * @desc   link function for alert banner attr directive
     * @param  {$scope}   $scope
     * @param  {$element} $el
     */
    link($scope, $el) {
      this._scope = $scope;

      $el[0].addEventListener('click', () => { this.onClick(); });
    }
  }

  register('angular-alert-banner')
    .directive('alertBannerAttr', AlertBannerAttrDirective)
  ;

}());