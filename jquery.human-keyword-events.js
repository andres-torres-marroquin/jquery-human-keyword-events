(function($) {
  $.eventKeys = {
    'escape': 27,
    'enter': 13,
    'shift': 16,
    'control': 17,
    'alt': 18,
    'space': 32,
    'tab': 9,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40
  };
  var i;

  // a-z
  for (i = 97; i <= 122; i++) {
    $.eventKeys[String.fromCharCode(i)] = i;
  }

  // 0-9
  for (i = 48; i <= 57; i++) {
    $.eventKeys[String.fromCharCode(i)] = i;
  }

  var rtypes = /(keyup|keypress|keydown):/g;
  // Taken from jquery-1.9.1.js
  var core_rnotwhite = /\S+/g;
  var rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
  function returnFalse() {
    return false;
  }

  $.fn.origOn = $.fn.on;
  $.fn.on = function( types, selector, data, fn, /*INTERNAL*/ one ) {

      if( typeof types !== "string" ) {
          return this.origOn( types, selector, data, fn, /*INTERNAL*/ one );
      }
      if( !types.match(rtypes) ) {
          return this.origOn( types, selector, data, fn, /*INTERNAL*/ one );
      }

      // Params adjustment taken from jquery-1.9.1.js on "on" function
      if ( data == null && fn == null ) {
        // ( types, fn )
        fn = selector;
        data = selector = undefined;
      } else if ( fn == null ) {
        if ( typeof selector === "string" ) {
          // ( types, selector, fn )
          fn = data;
          data = undefined;
        } else {
          // ( types, data, fn )
          fn = data;
          data = selector;
          selector = undefined;
        }
      }
      if ( fn === false ) {
        fn = returnFalse;
      } else if ( !fn ) {
        return this;
      }

      var tmp, origType, namespaces, type, key, origFn, keyCode, function_creator;

      origFn = fn;
      function_creator = function( keyCode ) {
        return function ( e ) {
          if (e.which == keyCode) {
            return origFn( e );
          }
        };
      };

      types = ( types || "" ).match( core_rnotwhite ) || [""];
      t = types.length;

      while ( t-- ) {
        tmp = rtypenamespace.exec( types[t] ) || [];
        origType = tmp[1];
        namespaces = ( tmp[2] || "" ).split( "." ).sort();

        tmp = origType.split( ":" );
        type = tmp[0];
        key = tmp[1].toLowerCase();
        namespaces.splice( 0, 0, "keyevent-" + key ); // Insert the element on index 0
        namespaces.splice( 0, 0, type ); // Insert the element on index 0
        type = namespaces.join( '.' );
        keyCode = $.eventKeys[key];
        fn = function_creator( keyCode );
        this.on( type, selector, data, fn, /*INTERNAL*/ one );

      }
      return this;
  };
}(jQuery));
