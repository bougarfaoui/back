"use strict";
var container_1 = require("../container");
var controllerHandler_1 = require("../handlers/controllerHandler");
var injection_js_1 = require("injection-js");
function RestController(target) {
    var dependencies = Reflect.getMetadata("design:paramtypes", target);
    var controllerName = target["name"];
    var controllerHandler = container_1.Container.controllerHandlers[controllerName];
    if (!controllerHandler) {
        controllerHandler = new controllerHandler_1.ControllerHandler();
    }
    controllerHandler.isRest = true;
    injection_js_1.Injectable().call(null, target);
    container_1.Container.components[controllerName] = target;
}
exports.RestController = RestController;
