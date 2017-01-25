
 
import {Container} from "../container";
import {MethodHandler } from './methodHandler';
/**
 * @wahtItDoes holds all information about the controller
 * 
 */
export class ControllerHandler{
    /**
     * the route assigned to the controller using the @Route decorator
     */
    route : string;
    /**
     * name of the controller
     */
    controller : string;
    /**
     * MethodHandler look methodHandler.ts file
     */
    methodsHandlers : MethodHandler[] = [];
 
}