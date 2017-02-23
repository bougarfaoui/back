"use strict";
var injection_js_1 = require("injection-js");
require("reflect-metadata");
/**
 * @whatItDoes holds all the components (controllers, services, ...) and instances
 */
var Container = (function () {
    function Container() {
    }
    /**
     * get an instance of the component
     */
    Container.get = function (token) {
        var tokenName;
        if (typeof token !== "string") {
            tokenName = token["name"];
        }
        else {
            tokenName = token;
        }
        if (Container.instances[tokenName]) {
            return Container.instances[tokenName];
        }
        var component = Container.components[tokenName];
        if (component) {
            var _components = Object.keys(Container.components)
                .map(function (key) {
                return Container.components[key];
            });
            var injector = injection_js_1.ReflectiveInjector.resolveAndCreate(_components);
            return this.instances[tokenName] = injector.get(component);
        }
        return undefined;
    };
    return Container;
}());
/**
 * Array of components , each component holds its function constructor
 * and its dependencies
 */
Container.components = [];
/**
 * see ../handlers/controllerHandler.ts
 */
Container.controllerHandlers = [];
/**
 * each component (service ,controller,...) instansiated will be pushed here
 */
Container.instances = [];
exports.Container = Container;
