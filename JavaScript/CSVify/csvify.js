"use strict";

function csvify(selector, dataMap, dataReplacementCallback) {
    var _elements = null;
    
    function getElements() {
        _elements = document.querySelectorAll(selector);
    }

    function createMap() {
        var items = [];
        _elements.forEach(function(item) {
            var innerItem = [];
            dataMap.forEach(function(dmItem) {
                if (dmItem.selector !== "") {
                    var data = item.querySelector(dmItem.selector).innerText;
                    if (typeof (dmItem.callback) === 'function') {
                        // Individual field callback
                        data = dmItem.callback(data);
                    } else if (typeof dataReplacementCallback === 'function') {
                        // Overall replacement callback
                        data = dataReplacementCallback(data);
                    } else {
                        // Default replace characters
                        data = replaceSpecialChars(data);
                    }
                    innerItem.push(data);
                } else {
                    innerItem.push(" ");
                }
            })

            items.push(innerItem.join(", "));
        });
        return items;
    }

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

    function replaceSpecialChars(text) {
        text = text
            .replace(/\,/gi, "\\,")
            .replace(/\"/gi, '\\"');

        if (text.indexOf('"') > -1) {
            console.log('match');
            text = '"' + text + '"';
        }
        return text;
    }

    function init() {
        getElements();
        return createCSV(createMap());
    }
    return init();
}
