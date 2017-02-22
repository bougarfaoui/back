"use strict";
var container_1 = require("../container");
var controllerHandler_1 = require("../handlers/controllerHandler");
var methodHandler_1 = require("../handlers/methodHandler");
require("reflect-metadata");
/**
 * @whatItDoes method decorator indicates the return value should be bound
 * to the web response body
 * @howToUse
 * ```
 * @Get("/user/:id")
 * @ResponseBody
 * updateUser(req: Request,id: number): User{
 *  // code here
 *  return new User(125,"jhon",35);
 * }
 * ```
 * @description
 * the return value will be bound to the response body, if the return value
 * is type of Promise the holded value will be sent
 */
function ResponseBody(target, methodName) {
    var controllerName = target.constructor["name"];
    var controllerHandler = container_1.Container.controllerHandlers[controllerName];
    if (!controllerHandler) {
        controllerHandler = new controllerHandler_1.ControllerHandler();
    }
    var methodHandler = controllerHandler.methodsHandlers[methodName];
    if (!methodHandler) {
        methodHandler = new methodHandler_1.MethodHandler();
    }
    var type = Reflect.getMetadata("design:returntype", target, methodName);
    if (!type) {
        throw controllerName + "." + methodName + " return type must be specified";
    }
    methodHandler.hasResponseBodyDecorator = true;
    controllerHandler.methodsHandlers[methodName] = methodHandler;
    container_1.Container.controllerHandlers[controllerName] = controllerHandler;
}
exports.ResponseBody = ResponseBody;
