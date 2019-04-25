# CSVify

Ths method helps to extract (usually) repeating data from a page into a CSV style format.

## Function parameters
* **selector** (required): The DOM nodes to iterate through.
* **dataMap** (required: The data map of the column headers that match to a sub DOM node selector.
* **dataReplacementCallback**: Optional parameter to filter each row's column data via a callback function.
* **dataHeaderCallback**: Optional parameter to customize the CSV's header with a callback function. If passed, will override default functionality.
* **dataFooterCallback**: Optional parameter to pass a custom filter with a callback function. Total number of repeating items will be passed as a  parameter of this callback.

## Example

```javascript
let dataMap = {
    // {column: "Column Header", selector: "css-selector"}
    {column: "Name", selector: "h2"},
    {column: "Price", selector: ".product-price"},
};

let csv = csvify('.products', dataMap);
console.log(csv);
/* Results:

Name, Price
Product 1, $35
Product 2, $14.99
*/
```

## Using the object's callback functions

You can pass the optional parameters as callback functions like this:

```javascript
let filterCb = function(data) {
    return data
        .replace(/\[/gi, '\{')
        .replace(/\]/gi, '\}');
}

let headerCb = function() {
    return "Name, Full Price";
}

let footerCb = function(total) {
    return "Total item(s): " + total;
}

let csv = csvify('.products', dataMap, filterCb, headerCb, footerCb);
```
The script will automatically replace commas and double-quotes if you do not pass a dataReplacementCallback() callback function (shown as `filterCb` here). However, that default behavior will be bypassed if you pass your own method, so be sure to handle those characters as you needs.

## Data field callback
You can optionally pass a callback method per field in your dataMap like this:

```javascript
let nameFixer = function(data) {
    return data.toLowerCase();
};

let dataMap = {
    // {column: "Column Header", selector: "css-selector", callback: "optional callback method"}
    {column: "Name", selector: "h2", callback: nameFixer},
    {column: "Price", selector: ".product-price"},
};