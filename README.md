# twoFingersSwipe

Catch horizontal scrolling and fire custom event - `twoFingersSwipe`. Check out the [demonstration](http://BR0kEN-.github.io/twoFingersSwipe).

## Usage

```javascript
jQuery('.selector').bind('twoFingersSwipe', function (event, direction) {
  switch (direction) {
    case 'left':
      // Do something.
      break;

    case 'right':
      // Do something.
      break;
  }
})
```
