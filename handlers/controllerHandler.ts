
 
import {Container} from "../container";
import {MethodHandler } from './methodHandler';

export class ControllerHandler{
    /**
     * the route assigned to the controller using the @Route decorator
     * 
     * example :
     * @Controller
     * @Route('/product')
     * class ProductController{
     *      ...
     * }
     * 
     * route  is '/product'
     */
    route : string;
    /**
     * controller is a class that handle requests related to a route 
     */
    controller : {target : any , dependencies : any[]};
    /**
     * MethodHandler look methodHandler.ts file
     */
    methodsHandlers : MethodHandler[] = [];

    dependencies : any[];

 
}