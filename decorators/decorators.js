"use strict";
var container_1 = require("../container");
var controllerHandler_1 = require("../handlers/controllerHandler");
var methodHandler_1 = require("../handlers/methodHandler");
var http_1 = require("../_http/http");
require("reflect-metadata");
var getFunctionParametersNames = require("get-parameter-names");
/**
 * @whatItDoes helper function used by {@Post, @Get, @Put, @Delete} decorators
 */
function helperFunction(target, methodName, route, httpRequestMethod) {
    /**
     * looking for the method's controllerHandler
     */
    var controllerName = target.constructor["name"];
    var controllerHandler = container_1.Container.controllerHandlers[controllerName];
    if (!controllerHandler) {
        controllerHandler = new controllerHandler_1.ControllerHandler();
    }
    var methodHandler = controllerHandler.methodsHandlers[methodName];
    if (!methodHandler) {
        methodHandler = new methodHandler_1.MethodHandler();
    }
    /**
     * attach the method information to the methodHandler
     */
    methodHandler.route = route;
    methodHandler.methodName = methodName;
    methodHandler.paramsTypes = Reflect.getMetadata("design:paramtypes", target, methodName);
    methodHandler.paramsNames = getFunctionParametersNames(target[methodName]);
    methodHandler.controller = target.constructor["name"];
    methodHandler.httpRequestMethod = httpRequestMethod;
    controllerHandler.methodsHandlers[methodName] = methodHandler;
    container_1.Container.controllerHandlers[controllerName] = controllerHandler;
}
/**
 * @whatItDoes method decorator indicates the route handled by the method
 * @howToUse
 * ```
 * @Get("/user/:id")
 * getUser(req: Request, res: Response) {
 *  // code here
 * }
 * ```
 * @description
 * the method will handle all the requests of type GET coming from the route
 * specified in its parameter
 */
function Get(route) {
    return function (target, methodName) {
        helperFunction(target, methodName, route, http_1.HttpRequestMethod.GET);
    };
}
exports.Get = Get;
/**
 * @whatItDoes method decorator indicates the route handled by the method
 * @howToUse
 * ```
 * @Post("/user")
 * addUser(req: Request, res: Response) {
 *  // code here
 * }
 * ```
 * @description
 * the method will handle all the requests of type POST coming from the route
 * specified in its parameter
 */
function Post(route) {
    return function (target, methodName) {
        helperFunction(target, methodName, route, http_1.HttpRequestMethod.POST);
    };
}
exports.Post = Post;
/**
 * @whatItDoes method decorator indicates the route handled by the method
 * @howToUse
 * ```
 * @Put("/user")
 * updateUser(req: Request, res: Response) {
 *  // code here
 * }
 * ```
 * @description
 * the method will handle all the requests of type PUT coming from the route
 * specified in its parameter
 */
function Put(route) {
    return function (target, methodName) {
        helperFunction(target, methodName, route, http_1.HttpRequestMethod.PUT);
    };
}
exports.Put = Put;
/**
 * @whatItDoes method decorator indicates the route handled by the method
 * @howToUse
 * ```
 * @Delete("/user/:id")
 * deleteUser(req: Request, res: Response) {
 *  // code here
 * }
 * ```
 * @description
 * the method will handle all the requests of type DELETE coming from the route
 * specified in its parameter
 */
function Delete(route) {
    return function (target, methodName) {
        helperFunction(target, methodName, route, http_1.HttpRequestMethod.DELETE);
    };
}
exports.Delete = Delete;
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
