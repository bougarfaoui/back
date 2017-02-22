"use strict";
var container_1 = require("../container");
var injection_js_1 = require("injection-js");
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
function Repository(target) {
    container_1.Container.components[target["name"]] = target;
    injection_js_1.Injectable().call(null, target);
}
exports.Repository = Repository;
