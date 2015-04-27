# Angular Alert Banner

Angular module for display alert message as banner.

See demo [here](http://samouss.github.io/angular-alert-banner/#)

## Installation

Choose your prefer methods for installation:

* via bower: `bower install --save angular-alert-banner`
* via Github: [angular-alert-banner](https://github.com/samouss/angular-alert-banner/archive/master.zip)

Then add files to your index:

```html
<head>
  ...
  <!-- add css file -->  
  <link rel="stylesheet" href="bower_components/angular-alert-banner/dist/angular-alert-banner.css">
  ...
</head>
<body>
  ...
  <!-- add js file -->
  <script src="bower_components/angular-alert-banner/dist/angular-alert-banner.min.js" ></script>
</body>

```

Register this module as dependency for your application:

```js
var myapp = angular.module('myapp', ['angular-alert-banner']);
```

And finally, add the custom element at the top of your file:

```html
<alert-banner></alert-banner>
```

## Usage

### Factory

You can pass the factory to controller/service... and use the publish method:

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

#### Method

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

### Directive

You can use the directive directly from your DOM with:

```html
<a 
  href=""
  alert-banner-attr
  type="info"
  message="Display from directive attribute !"
></a>
```

#### Options

#### type

Type: `string`

Sub class for your alert

#### message

Type: `string`

Text of your alert

#### autoClose

Type: `boolean` Default: `true`

Define if banner autoClose after timeCollapse

#### timeCollapse

Type: `integer` Default: `5000`

Duration for collaspe banner

#### onOpen

Type: `function`

Callback on open

#### onClose

Type: `function`

Callback on close

## Configuration

You can configure default options via AlertBannerProvider:

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

### Method

#### className

Type: `string` Default: `alert-message`

#### animationDuration

Type: `integer` Default: `250`

#### timeCollapse

Type: `integer` Default: `5000`

#### autoClose

Type: `boolean` Default: `true`
