

import { ControllerHandler } from "./handlers/controllerHandler";
import { MethodHandler } from './handlers/methodHandler';


/**
 * @whatItDoes holds all the components (controllers , services ,...) and instances  
 */

export class Container{
    /**
     * Array of components , each component holds its function constructor
     * and its dependencies 
     */
    static components : any = [];
    /**
     * see ../handlers/controllerHandler.ts 
     */
    static controllerHandlers : ControllerHandler[] = [];
    /**
     * each component (service ,controller,...) instansiated will be pushed here 
     */
    static instances : any[] = [];
    /**
     * get an instance of the component
     */
    static get(token : string | Function){

        let tokenName : string;
     
        if(typeof token !== 'string'){
            tokenName = token['name'];
        }else{
            tokenName = token;
        }
        
        if(this.instances[tokenName]){
            return this.instances[tokenName];
        }

        let injectable = this.components[tokenName];

        if(injectable){
            
            let _dependencies : any[] = injectable.dependencies;
            let _constructor : any = injectable._constructor; 
            
            if(_dependencies.length > 0){
                 
                let dependecies = _dependencies.map( dependency => this.get(dependency) );
                
                return this.instances[tokenName] = new _constructor(...dependecies);
            }
             
            return this.instances[tokenName] = new _constructor();
        }

        return undefined;
    }

}

