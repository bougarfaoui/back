

import { ControllerHandler } from "./handlers/controllerHandler";
import { MethodHandler } from './handlers/methodHandler';




export class Container{
    static components : any = [];
    static controllerHandlers : ControllerHandler[] = [];
    static instances : any[] = [];

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

