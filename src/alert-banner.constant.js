(() => {

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