"use strict";
var container_1 = require("../container");
var controllerHandler_1 = require("../handlers/controllerHandler");
var injection_js_1 = require("injection-js");
/**
 * @whatItDoes class Decorator used to mark a class as a controller
 * @howToUse
 * ```
 * @Controller
 * class homeController {
 *  // code here
 * }
 * ```
 */
function Controller(target) {
    var dependencies = Reflect.getMetadata("design:paramtypes", target);
    var controllerName = target["name"];
    var controllerHandler = container_1.Container.controllerHandlers[controllerName];
    if (!controllerHandler) {
        controllerHandler = new controllerHandler_1.ControllerHandler();
    }
    injection_js_1.Injectable().call(null, target);
    container_1.Container.components[controllerName] = target;
}
exports.Controller = Controller;
