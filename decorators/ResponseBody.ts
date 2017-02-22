import { Container } from "../container";
import { ControllerHandler } from "../handlers/controllerHandler";
import { MethodHandler } from "../handlers/methodHandler";
import getFunctionParametersNames =  require("get-parameter-names");
import "reflect-metadata";

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