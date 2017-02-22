"use strict";
var container_1 = require("../container");
var controllerHandler_1 = require("../handlers/controllerHandler");
var methodHandler_1 = require("../handlers/methodHandler");
var getFunctionParametersNames = require("get-parameter-names");
function PathVariable(variableName) {
    return function (target, methodName, parameterIndex) {
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
        methodHandler.pathVariables.set(parameterIndex, variableName || paramName);
        controllerHandler.methodsHandlers[methodName] = methodHandler;
        container_1.Container.controllerHandlers[controllerName] = controllerHandler;
    };
}
exports.PathVariable = PathVariable;
