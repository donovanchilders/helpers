# CSVify

Ths method helps to extract (usually) repeating data from a page into a CSV style format.

## Function Parameters
* **selector** (required): The DOM nodes to iterate through.
* **dataMap** (required: The data map of the column headers that match to a sub DOM node selector.
* **dataReplacementCallback**: Optional parameter to filter each row's column data via a callback function.

## Example

```javascript
let dataMap = {
    // {column: "Column Header", selector: "css-selector", callback: "optional callback method"}
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

## Using the dataReplacementCallback() function

You can pass the optional parameter as a function callback to filter content in all fields like this:

```javascript
let cb = function(data) {
    return data
        .replace(/\[/gi, '\{')
        .replace(/\]/gi, '\}');
}

let csv = csvify('.products', dataMap, cb);
```
The script will automatically replace commas and double-quotes if you do not pass a callback function. However, that default behavior will be bypassed if you pass your own method, so be sure to handle those characters as you needs.

You can optionally pass a callback method per field in your dataMap like this:

```javascript
let nameFixer = function(data) {
    return data.toLowerCase();
};

let dataMap = {
    {column: "Name", selector: "h2", callback: nameFixer},
    {column: "Price", selector: ".product-price"},
};