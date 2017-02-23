"use strict";
var index_1 = require("./index");
function BackApplication(configs) {
    return function (target) {
        index_1.Back.configs = configs;
    };
}
exports.BackApplication = BackApplication;
