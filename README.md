# Angular Alert Banner

Angular module for display alert as banner.

## Installation

Choose your prefer methods for installation:

* via bower: `bower install --save git@github.com:samouss/angular-alert-banner.git`
* via Github: [angular-alert-banner](https://github.com/samouss/angular-alert-banner/archive/master.zip)

Then add the file to your index:

```html
<script src="bower_components/angular-alert-banner/dist/angular-alert-banner.min.js" ></script>
```

Register this module as dependency for your application:

```js
var myapp = angular.module('myapp', ['angular-alert-banner']);
```

And finally, add the custom element at the top of your file:

```html
<alert-banner></alert-banner>
```

## Configuration

You can configure the module via AlertBannerProvider (see below for [options](#options)):

```js
myapp.config([
  'AlertBannerProvider',
  function(AlertBannerProvider) {

    // configure the provider
    AlertBannerProvider
      .setClassName(YOUR_CLASS_NAME)
      .setTimeCollapse(YOUR_COLLAPSE_TIME)
      ....
    ;

  }
]);
```

## Usage

### Factory

You can pass the factory to controller/service/... and use the publish method:

```js
function AppController(AlertBanner) {
    
    var vm = this;

    vm.displayMessage = displayMessage;

    function displayMessage(type, message) {
      AlertBanner.publish({
        type: type,
        message: message
      });
    }

}

angular.module('myapp').controller('AppController', AppController);
```

### Directive

You can use the derictive without the factory with:

```html
<a 
  href=""
  alert-banner-attr
  type="info"
  message="Display from directive attribute !"
></a>
```

## Options for configure provider 

#### className

Type: `string` Default: `alert-message`

#### animationDuration

Type: `integer` Default: `250`

#### timeCollapse

Type: `integer` Default: `5000`

#### autoClose

Type: `boolean` Default: `true`

## Factory method

#### publish 

Arguments:
```js
{
  type: 'info', // sub class for your banner
  message: 'YOUR_MESSAGE', // message display in banner
  timeCollapse: 250,
  autoClose: true,
  onOpen: function() {},
  onClose: function() {}
}
```

This method display your message.

#### getClassName

Return: `string`

#### getAnimationDuration

Return: `integer`

#### getDefaultOptions

Return: `object`

Return the object of configurable options for your alert.

## Directive options

