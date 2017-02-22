import { Container } from "../container";
import { ControllerHandler } from "../handlers/controllerHandler";
import { MethodHandler } from "../handlers/methodHandler";
import { HttpRequestMethod } from "../_http/http";
import { Injectable } from "injection-js";
import "reflect-metadata";
import getFunctionParametersNames =  require("get-parameter-names");


/**
 * @whatItDoes helper function used by {@Post, @Get, @Put, @Delete} decorators
 */
function helperFunction(target: any, methodName: string, route: string, httpRequestMethod: HttpRequestMethod) {
    /**
     * looking for the method's controllerHandler
     */
    let controllerName = target.constructor["name"];
    let controllerHandler = Container.controllerHandlers[controllerName];

    if (!controllerHandler) {
       controllerHandler = new ControllerHandler();
    }

    let methodHandler = controllerHandler.methodsHandlers[methodName];

    if (!methodHandler) {
        methodHandler = new MethodHandler();
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
    Container.controllerHandlers[controllerName] = controllerHandler;
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
export function Get(route: string) {
    return (target: any, methodName: string) => {
        helperFunction(target, methodName, route, HttpRequestMethod.GET);
    };
}

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
export function Post(route: string) {
    return (target: any, methodName: string) => {
        helperFunction(target, methodName, route, HttpRequestMethod.POST);
    };
}

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
export function Put(route: string) {
    return  (target: any, methodName: string) => {
        helperFunction(target, methodName, route, HttpRequestMethod.PUT);
    };
}

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
export function Delete(route: string) {
    return  (target: any, methodName: string) => {
        helperFunction(target, methodName, route, HttpRequestMethod.DELETE);
    };
}


