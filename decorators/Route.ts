import { Container } from "../container";
import { ControllerHandler } from "../handlers/controllerHandler";

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