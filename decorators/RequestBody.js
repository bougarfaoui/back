"use strict";
var container_1 = require("../container");
var controllerHandler_1 = require("../handlers/controllerHandler");
var methodHandler_1 = require("../handlers/methodHandler");
var getFunctionParametersNames = require("get-parameter-names");
/**
 * @whatItDoes parameter decorator indicates that the parameter should be bound
 * to the web request body
 * @howToUse
 * ```
 * @Put("/user")
 * updateUser(req: Request, res: Response, @RequestBody newUser) {
 *  // code here
 * }
 * ```
 * @description
 * the parameter will be bound to the request body
 */
function RequestBody(target, methodName, parameterIndex) {
    var controllerName = target.constructor["name"];
    var controllerHandler = container_1.Container.controllerHandlers[controllerName];
    if (!controllerHandler) {
        controllerHandler = new controllerHandler_1.ControllerHandler();
    }
    var methodHandler = controllerHandler.methodsHandlers[methodName];
    if (!methodHandler) {
        methodHandler = new methodHandler_1.MethodHandler();
    }
    var paramName = getFunctionParametersNames(target[methodName])[parameterIndex];
    methodHandler.requestBodyParams[paramName] = true;
    controllerHandler.methodsHandlers[methodName] = methodHandler;
    container_1.Container.controllerHandlers[controllerName] = controllerHandler;
}
exports.RequestBody = RequestBody;
