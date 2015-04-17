(function() {

  angular
    .module('angular-alert-banner')
    .constant('ALERT', {
      CLASS_NAME: 'alert-message',
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
      },
      DURATIONS: {
        ANIMATION: 250,
        TIMING: 5000
      }
    })
  ;

}());