# CustomConsole

This method will create a custom logger in the DOM and let you send log statements to it.

## Function parameters
* **showDate** : Whether to show the date stamp when logging.callback.

## Example

```javascript
// Initialize the logger
var logger = customConsole(true);
logger.init();

// Log something to it
logger.log("A new log entry!");
```
