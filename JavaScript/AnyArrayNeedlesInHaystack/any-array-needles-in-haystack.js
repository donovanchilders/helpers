"use strict";

var needle = ['"', '[', ']'];
var haystack = 'This is a [test]';

function anyArrayNeedlesInHaystack(needles, haystack) {
    var result = needles.some(function(substring) {
        return haystack.includes(substring);
    });
    return result;
}

console.log(result);
