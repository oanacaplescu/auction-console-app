"use strict";
exports.__esModule = true;
exports.log = void 0;
function log(message, data) {
    console.log(message);
    data && console.log(JSON.stringify(data));
}
exports.log = log;
