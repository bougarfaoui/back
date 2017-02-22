import { Container } from "../container";
import { ControllerHandler } from "../handlers/controllerHandler";
import { MethodHandler } from "../handlers/methodHandler";
import { Injectable } from "injection-js";
import getFunctionParametersNames = require("get-parameter-names");

export function PathVariable(variableName?: string): Function {
    return function (target: Function, methodName: string, parameterIndex: number): void {
        let controllerName = target.constructor["name"];
        let controllerHandler = Container.controllerHandlers[controllerName];

        if (!controllerHandler) {
            controllerHandler = new ControllerHandler();
        }

        let methodHandler: MethodHandler = controllerHandler.methodsHandlers[methodName];

        if (!methodHandler) {
            methodHandler = new MethodHandler();
        }
        let paramName: string = getFunctionParametersNames(target[methodName])[parameterIndex];
        methodHandler.pathVariables.set(parameterIndex, variableName || paramName);
        controllerHandler.methodsHandlers[methodName] = methodHandler;
        Container.controllerHandlers[controllerName] = controllerHandler;
    };
}

