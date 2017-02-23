import { Container } from "../container";
import { ControllerHandler } from "../handlers/controllerHandler";
import { MethodHandler } from "../handlers/methodHandler";
import getFunctionParametersNames =  require("get-parameter-names");

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
