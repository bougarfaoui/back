import { ControllerHandler } from "./handlers/controllerHandler";
import { MethodHandler } from "./handlers/methodHandler";
import { ReflectiveInjector, Injectable } from 'injection-js';
import "reflect-metadata";

/**
 * @whatItDoes holds all the components (controllers, services, ...) and instances
 */

export class Container {
    /**
     * Array of components , each component holds its function constructor
     * and its dependencies
     */
    static components: any = [];

    /**
     * see ../handlers/controllerHandler.ts
     */
    static controllerHandlers: ControllerHandler[] = [];

    /**
     * each component (service ,controller,...) instansiated will be pushed here
     */
    static instances: any[] = [];

    /**
     * get an instance of the component
     */
    static get(token: string | Function) {

        let tokenName: string;

        if (typeof token !== "string") {
            tokenName = token["name"];
        }
        else {
            tokenName = token;
        }

        if (Container.instances[tokenName]) {
            return Container.instances[tokenName];
        }

        let component = Container.components[tokenName];

        if (component) {
            let _components = Object.keys(Container.components)
                                    .map(function(key){
                                        return Container.components[key];
                                    });

            const injector = ReflectiveInjector.resolveAndCreate(_components);
            return this.instances[tokenName] = injector.get(component);
        }

        return undefined;
    }
}
