import { Container } from "../container";
import { ControllerHandler } from "../handlers/controllerHandler";
import { MethodHandler } from "../handlers/methodHandler";
import { HttpRequestMethod } from "../_http/http";

import "reflect-metadata";
import getFunctionParametersNames =  require("get-parameter-names");

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
export function Controller(target: Function) {
    const dependencies = Reflect.getMetadata("design:paramtypes", target);

    let controllerName = target["name"];
    let controllerHandler = Container.controllerHandlers[controllerName];

    if (!controllerHandler) {
        controllerHandler = new ControllerHandler();
    }

    Container.components[controllerName] = {
        _constructor: target,
        dependencies: dependencies
    };
}

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
export function Route(route: string) {
    return (target: Function) => {
        if (!route) {
            throw "Route must not be Empty";
        }

        let controllerName = target["name"];
        let controllerHandler = Container.controllerHandlers[controllerName];

        if (!controllerHandler) {
            controllerHandler = new ControllerHandler();
        }

        controllerHandler.route = route;
    };
}

/**
 * @whatItDoes class Decorator used to indicates that the class is injectable
 * @howToUse
 * ```
 * @Service
 * class productService {
 *  // code here
 * }
 * ```
 * @description
 * A class with decorator can injected in other class's constructor
 */
export function Service(target: Function) {
    Container.components[target["name"]] = {
        _constructor: target,
        dependencies: Reflect.getMetadata("design:paramtypes", target)
    };
}

/**
 * @whatItDoes the as the Service decorator
 * @howToUse
 * ```
 * @Injectable
 * class productService {
 *  // code here
 * }
 * ```
 * @description
 * A class with decorator can injected in other class's constructor
 */
export function Injectable(target: Function) {
    Container.components[target["name"]] = {
        _constructor: target,
        dependencies: Reflect.getMetadata("design:paramtypes", target)
    };
}

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
export function RequestBody(target: Object, methodName: string, parameterIndex: number): void {
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
    methodHandler.requestBodyParams[paramName] = true;
    controllerHandler.methodsHandlers[methodName] = methodHandler;
    Container.controllerHandlers[controllerName] = controllerHandler;
}

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
export function ResponseBody(target: any, methodName: string): void {
    let controllerName = target.constructor["name"];
    let controllerHandler = Container.controllerHandlers[controllerName];

    if (!controllerHandler) {
       controllerHandler = new ControllerHandler();
    }

    let methodHandler = controllerHandler.methodsHandlers[methodName];

    if (!methodHandler) {
        methodHandler = new MethodHandler();
    }

    let type = Reflect.getMetadata("design:returntype", target, methodName);

    if (!type) {
        throw controllerName + "." + methodName + " return type must be specified";
    }

    methodHandler.hasResponseBodyDecorator = true;
    controllerHandler.methodsHandlers[methodName] = methodHandler;
    Container.controllerHandlers[controllerName] = controllerHandler;
}
