
import { Container } from "../container";
import { ControllerHandler } from "../handlers/controllerHandler";
import { MethodHandler } from "../handlers/methodHandler";
import { HttpRequestMethod } from "../_http/http";

import "reflect-metadata";
import getFunctionParametersNames =  require("get-parameter-names");


export function Controller(target : Function){
      
    const dependencies = Reflect.getMetadata("design:paramtypes", target);
   
    let controllerName = target['name'];

    let controllerHandler = Container.controllerHandlers[controllerName];
    
    if(!controllerHandler){
        controllerHandler = new ControllerHandler();
    }
    
    Container.components[controllerName] = {_constructor : target, dependencies : dependencies};
    controllerHandler.controller = {target : target, dependencies : dependencies};
}


export function Route(route : string){
    return (target : Function) => {
        
        if(!route){
            throw "Route must not be Empty";
        }

        let controllerName = target['name'];
        let controllerHandler = Container.controllerHandlers[controllerName];
        
        if(!controllerHandler){
            controllerHandler = new ControllerHandler();
        }

        controllerHandler.route = route;
    }
}





export function Service(target : Function){
    const dependencies = Reflect.getMetadata("design:paramtypes", target);
    Container.components[target['name']] = {_constructor : target , dependencies : dependencies };
}

export function Injectable(target : Function){
    const dependencies = Reflect.getMetadata("design:paramtypes", target);
    Container.components[target['name']] = {_constructor : target , dependencies : dependencies };
}




function helperFunction(target: any, methodName: string, route: string, httpRequestMethod : HttpRequestMethod){
     /**
    * looking for the method's controllerHandler  
    */
    let controllerName = target.constructor['name'];
    let controllerHandler = Container.controllerHandlers[controllerName];
    
    if(!controllerHandler){
       controllerHandler = new ControllerHandler();
    }

    let methodHandler = controllerHandler.methodsHandlers[methodName];

    if(!methodHandler){
        methodHandler = new MethodHandler();
    }
    
    /**
    * get parameters of method
    */
    const paramsTypes = Reflect.getMetadata("design:paramtypes", target, methodName);
     
   
    /**
    * handlerMethod contains all information about the method
    */
    
    methodHandler.route = route;
    methodHandler.methodName = methodName;
    methodHandler.paramsTypes = paramsTypes;
    methodHandler.paramsNames = getFunctionParametersNames(target[methodName]);
    methodHandler.controller = target.constructor['name'];
    methodHandler.httpRequestMethod = httpRequestMethod;
    
   
    controllerHandler.methodsHandlers[methodName] = methodHandler;
    Container.controllerHandlers[controllerName] = controllerHandler;
}


export function Get(route: string) {
    
    return  (target: any, methodName: string) => {
        helperFunction(target,methodName,route,HttpRequestMethod.GET);
    };
}


export function Post(route: string) {
    
    return  (target: any, methodName: string) => {
        helperFunction(target,methodName,route,HttpRequestMethod.POST);
    };
}


export function Put(route: string) {
    
    return  (target: any, methodName: string) => {
        helperFunction(target,methodName,route,HttpRequestMethod.PUT);
    };
}


export function Delete(route: string) {
    
    return  (target: any, methodName: string) => {
        helperFunction(target,methodName,route,HttpRequestMethod.DELETE);
    };
}


export function RequestBody(target: Object, methodName: string, parameterIndex: number) : void{
    let controllerName = target.constructor['name'];
    let controllerHandler = Container.controllerHandlers[controllerName];
    
    if(!controllerHandler){
       controllerHandler = new ControllerHandler();
    }

    let methodHandler : MethodHandler = controllerHandler.methodsHandlers[methodName];

    if(!methodHandler){
        methodHandler = new MethodHandler();
    }

    let paramName : string = getFunctionParametersNames(target[methodName])[parameterIndex];
    methodHandler.requestBodyParams[paramName] = true;
    controllerHandler.methodsHandlers[methodName] = methodHandler;
    Container.controllerHandlers[controllerName] = controllerHandler;
   
}

export function ResponseBody(target: any, methodName: string) : void{
    let controllerName = target.constructor['name'];
    let controllerHandler = Container.controllerHandlers[controllerName];
    
    if(!controllerHandler){
       controllerHandler = new ControllerHandler();
    }

    let methodHandler = controllerHandler.methodsHandlers[methodName];

    if(!methodHandler){
        methodHandler = new MethodHandler();
    }
 
    let type = Reflect.getMetadata("design:returntype", target, methodName);
    
    if(!type){
        throw controllerName + "." + methodName + " return type must be specified";
    }
    methodHandler.hasResponseBodyDecorator = true;
    controllerHandler.methodsHandlers[methodName] = methodHandler;
    Container.controllerHandlers[controllerName] = controllerHandler;
    
}
