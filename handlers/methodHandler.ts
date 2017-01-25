


import {Response, Request ,HttpRequestMethod} from "../_http/http";
import {Container} from "../container";


/**
 * @wahtItDoes holds all information about the method of a controller
 * 
 */
export class MethodHandler{
    route : string;
    methodName : string;
    paramsTypes : any[];
    paramsNames : any[];
    controller : string;
    httpRequestMethod : HttpRequestMethod;
    hasResponseBodyDecorator : boolean = false;
    requestBodyParams : boolean[] = [];

    call(req? : Request, res? : Response, next? : Function) : any{

        let controller = Container.get(this.controller);
        let method = controller[this.methodName];
        let paramsValues =  this.getparamsValues(req,res);
 
        let dataToBeSent : any = method.call(controller, ...paramsValues);
        
        if(this.hasResponseBodyDecorator){
            this.sendData(res,dataToBeSent);
        }

    }

    getparamsValues(req : Request, res : Response): any[]{

        let paramsValues = [];
        for(let i = 0; i< this.paramsNames.length; i++){
            paramsValues[i] = this.getParamValue(this.paramsNames[i], this.paramsTypes[i], req, res);
        }
        return paramsValues;

    }

    getParamValue(paramName : any,paramType : any,req : Request, res : Response){

        if(this.requestBodyParams[paramName]){
            return req.body;
        }
        else if(paramType === Request){
            return req;
        }
        else if(paramType === Response){
            return res;
        }
        else {    
            return req.params[paramName] || req.body[paramName] || req.query[paramName];
        }

    }

    sendData (res :Response ,data : any) : void{
        if(data instanceof Promise){

            <Promise<any>>data.then((dataToBeSent) => {
                res.json(dataToBeSent);
            });
        }
        else{
            res.json(data);
        }
    }

    isRequest (param) : boolean{
        return param.baseUrl !== undefined && param.method !== undefined;
    }

    isResponse (param) : boolean{
        return param.send !== undefined && param.end !== undefined;
    }

}