# jQuery Human Keyword Events

Tired of write meaningless code for key events?
```javascript
$(..).keyup(function(e) {
  if (e.which == 27) {
    // code and more code
  }
});
```

Worry no more!
```javascript
$(..).bind('keyup:escape', function(e) {
    // code and more code
});
```


# Using it

## Usage
First, load jQuery and then the plugin:

```html
<script src="jquery.min.js" type="text/javascript"></script>
<script src="jquery.keyevents.js" type="text/javascript"></script>
```


## Binding events
Binding a event to escape keyup
```javascript
$(...).bind('keyup:escape', fn)
```

Binding a event to enter keydown
```javascript
$(...).bind('keydown:enter', fn)
```

## Unbinding events
Unbinding a event to enter keydown
```javascript
$(...).unbind('keyup.keyevent-escape')
```

Unbinding a event to enter keydown
```javascript
$(...).unbind('keydown.keyevent-enter')
```

## Use it with Backbone.js!
```javascript
var View = Backbone.View.extend({
  ...

  events: {
    "keyup:escape":           "closeModals",
    "keyup:enter textarea":   "save",
    "keydown:s":              "save"
  },

  ...
});
```


# Keys supported:

  - `escape`
  - `enter`
  - `shift`
  - `control`
  - `alt`
  - `space`
  - `tab`
  - `left`
  - `up`
  - `right`
  - `down`
  - `a` .. `z`
  - `0` .. `9`


## Managing your own key events
Want to add your own keys?
```javascript
jQuery.eventKeys['esc'] = 27;
```
Want to use them?
```javascript
$(...).bind('keyup:esc', fn)
$(...).unbind('keyup.keyevent-esc')
```

# Test
Tested with jQuery 1.8.3, more and better testing coming!
