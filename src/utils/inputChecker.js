"use strict";
exports.__esModule = true;
exports.containsDelimiter = exports.isInvalidArray = exports.isEmptyArray = void 0;
function isEmptyArray(input) {
    return input.length === 0;
}
exports.isEmptyArray = isEmptyArray;
function isInvalidArray(input, expectedArrayLength) {
    return input.length <= (expectedArrayLength !== null && expectedArrayLength !== void 0 ? expectedArrayLength : 2) || input.some(function (data) { return !data; });
}
exports.isInvalidArray = isInvalidArray;
function containsDelimiter(input, del) {
    return input.includes(del);
}
exports.containsDelimiter = containsDelimiter;
