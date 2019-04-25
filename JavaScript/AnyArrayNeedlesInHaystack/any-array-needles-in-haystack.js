"use strict";

function anyArrayNeedlesInHaystack(needles, haystack) {
    var result = needles.some(function(substring) {
        return haystack.includes(substring);
    });
    return result;
}
