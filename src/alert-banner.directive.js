(() => {

  'use strict';

  /**
   * @name   AlertBanner
   * @desc   <alert-banner> directive
   * @param  {constant}    ALERT_BANNER
   * @param  {$timeout}    $timeout
   * @param  {$rootScope}  $rootScope
   * @param  {AlertBanner} AlertBanner
   * @ngInject
   */
  class AlertBannerDirective {

    constructor(ALERT_BANNER, $timeout, $rootScope, AlertBanner) {
      this.restrict = 'E';
      this.templateUrl = 'alert-banner.template.html';

      this._ALERT_BANNER = ALERT_BANNER;
      this._timeout = $timeout;
      this._rootScope = $rootScope;
      this._AlertBanner = AlertBanner;

      this._options = this._AlertBanner.getDefaultOptions();
      this.queue = [];
    }

    /**
     * Callback for event alert:publish
     * @param  {event}  event
     * @param  {object} data
     * @return {void}
     */
    onMessage(event, data) {
      this.clearQueue();

      angular.copy(this._options, this._$scope.alert);
      angular.extend(this._$scope.alert, data);

      this._el.querySelector('.' + this._AlertBanner.getClassName()).classList.add('active');

      this.queue.push(this._timeout(() => {
        this._$scope.alert.onOpen();
      }, this._AlertBanner.getAnimationDuration()));

      if (this._$scope.alert.autoClose) {
        this.queue.push(this._timeout(() => {
          this.close();
        }, this._$scope.alert.timeCollapse));
      }
    }

    /**
     * Close alert message
     * @return {void}
     */
    close() {
      if (this._el.querySelector('.' + this._AlertBanner.getClassName()).classList.contains('active')) {
        this.clearQueue();
        this._el.querySelector('.' + this._AlertBanner.getClassName()).classList.remove('active');
        this.queue.push(this._timeout(() => {
          this._$scope.alert.onClose();
          angular.copy(this._options, this._$scope.alert);
        }, this._AlertBanner.getAnimationDuration()));
      }
    }

    /**
     * Clear queue for alert timer
     * @return {void}
     */
    clearQueue() {
      this.queue.forEach((promise) => {
        this._timeout.cancel(promise);
      });
      this.queue = [];
    }

    /**
     * @name   link
     * @desc   link function for alert banner directive
     * @param  {$scope}   $scope
     * @param  {$element} $el
     */
    link($scope, $el) {
      this._$scope = $scope;
      this._el = $el[0];

      $scope.alert = {};
      $scope.className = this._AlertBanner.getClassName();

      $scope.close = () => { this.close(); };

      $scope.$on(this._ALERT_BANNER.EVENTS.PREFIX + this._ALERT_BANNER.EVENTS.TYPES.PUBLISH, (event, data) => { this.onMessage(event, data); });
    }
  }

  register('angular-alert-banner')
    .directive('alertBanner', AlertBannerDirective)
  ;

}());