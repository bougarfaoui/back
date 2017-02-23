"use strict";
var container_1 = require("../container");
var controllerHandler_1 = require("../handlers/controllerHandler");
/**
 * @whatItDoes class Decorator used to attach a route to the controller
 * @howToUse
 * ```
 * @Controller
 * @Route("/home")
 * class homeController {
 *  // code here
 * }
 * ```
 */
function Route(route) {
    return function (target) {
        if (!route) {
            throw "Route must not be Empty";
        }
        var controllerName = target["name"];
        var controllerHandler = container_1.Container.controllerHandlers[controllerName];
        if (!controllerHandler) {
            controllerHandler = new controllerHandler_1.ControllerHandler();
        }
        controllerHandler.route = route;
    };
}
exports.Route = Route;
