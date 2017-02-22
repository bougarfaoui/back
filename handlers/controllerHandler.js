"use strict";
/**
 * @wahtItDoes holds all information about the controller
 */
var ControllerHandler = (function () {
    function ControllerHandler() {
        /**
         * MethodHandler look methodHandler.ts file
         */
        this.methodsHandlers = [];
        this.isRest = false;
    }
    return ControllerHandler;
}());
exports.ControllerHandler = ControllerHandler;
