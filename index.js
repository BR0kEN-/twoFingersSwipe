(function ($, customEventName, nativeEventName) {
  'use strict';

  $.event.special[customEventName] = {
    setup: function (data, namespaces, eventHandle) {
      var swipe = {
        left: 0,
        right: 0
      };

      $(this).bind(nativeEventName, function (event) {
        var deltaX = event.deltaX || event.originalEvent.wheelDeltaX;
        var deltaY = event.deltaY || event.originalEvent.wheelDeltaY;

        // Ensure user not scrolling vertically.
        if (deltaY < 5) {
          var direction;

          // Stop reaction on back/prev page gestures produced by trackpads.
          if (
            (deltaX > 0 && this.scrollWidth === (this.scrollLeft + this.offsetWidth)) ||
            (deltaX < 0 && 0 === this.scrollLeft)
          ) {
            event.preventDefault();
          }

          if (deltaX < -5) {
            direction = 'left';
          }
          else if (event.originalEvent.wheelDeltaX > 5) {
            direction = 'right';
          }

          if (null !== direction && swipe[direction]++ > 5) {
            // Spoof event name.
            event.type = customEventName;
            // Add direction of swiping to build further logic.
            event.direction = direction;
            eventHandle.call(this, event, direction);

            // Event happened, reset the counter.
            swipe[direction] = 0;
          }
        }
      });
    },

    remove: function () {
      $(this).unbind(customEventName);
    }
  };
})(jQuery, 'twoFingersSwipe', 'onwheel' in document ? 'wheel' : 'mousewheel');
