import { Container } from "../container";
import { ControllerHandler } from "../handlers/controllerHandler";
import { Injectable } from "injection-js";

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

    Injectable().call(null, target);
    Container.components[controllerName] = target;
}