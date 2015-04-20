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