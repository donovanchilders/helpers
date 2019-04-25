"use strict";
/**
 * CSVify Object
 * 
 * @param {string} selector The CSS selector of the container
 * @param {object} dataMap Object map of Columns, Selectors and an optional replacement callback
 * @param {function} dataReplacementCallback Callback for global field replacements
 */
function csvify(selector, dataMap, dataReplacementCallback) {
    var _elements = null;
    
    /**
     * Get Elements method: Get the selector's DOM nodes
     */
    function getElements() {
        _elements = document.querySelectorAll(selector);
    }

    /**
     * Create the map of content
     */
    function createMap() {
        var items = [];
        _elements.forEach(function(item) {
            var innerItem = [];
            dataMap.forEach(function(dmItem) {
                if (dmItem.selector !== "") {
                    // If selector exists
                    var node = item.querySelector(dmItem.selector),
                        data = "";
                    if (typeof (dmItem.callback) === 'function') {
                        // Individual field callback
                        data = dmItem.callback(node.innerText, node);
                    } else if (typeof dataReplacementCallback === 'function') {
                        // Overall replacement callback
                        data = dataReplacementCallback(node.innerText, node);
                    } else {
                        // Default replace characters
                        data = replaceSpecialChars(node.innerText);
                    }
                    innerItem.push(data);
                } else if (dmItem.selector === "" && typeof (dmItem.callback) === 'function') {
                    // If no selector but a callback exists
                    innerItem.push(dmItem.callback(" ", node));
                } else {
                    // Default if no selector and no callback
                    innerItem.push(" ");
                }
            })

            items.push(innerItem.join(", "));
        });
        return items;
    }

    /**
     * Create the CSV string
     * @param {array} data The array of parsed data
     */
    function createCSV(data) {
        var content = [];
        var header = [];
        // Create header row
        dataMap.forEach(function(item) {
            header.push(item.column);
        });

        content.push(header.join(", "));
        content.push(data.join("\n"));
        return content.join("\n");
    }

    /**
     * Replace special characters
     * @param {string} text The text to replace special characters
     */
    function replaceSpecialChars(text) {
        text = text
            .replace(/\,/gi, "\\,")
            .replace(/\"/gi, '\\"');

        if (text.indexOf('"') > -1) {
            text = '"' + text + '"';
        }
        return text;
    }

    /**
     * Main init function to start work
     */
    function init() {
        getElements();
        return createCSV(createMap());
    }
    return init();
}
