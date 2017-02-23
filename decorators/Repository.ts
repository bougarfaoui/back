import { Container } from "../container";
import { Injectable } from "injection-js";

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
export function Repository(target: Function) {
    Container.components[target["name"]] = target;
    Injectable().call(null, target);
}