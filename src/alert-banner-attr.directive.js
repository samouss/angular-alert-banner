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
        $scope.$apply(function() {
          AlertBanner.publish({
            type: $scope.type,
            message: $scope.message
          });
        });
      }

    }

    return {
      scope: {
        message: '@',
        type: '@',
        autoClose: '@?',
        timeCollapse: '@?'
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