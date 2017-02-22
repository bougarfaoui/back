import { Response, Request, HttpRequestMethod } from "../_http/http";
import { Container } from "../container";
import { ControllerHandler } from "./controllerHandler";

/**
 * @wahtItDoes holds all information about the method of a controller
 */
export class MethodHandler {
    route: string;
    methodName: string;
    paramsTypes: any[];
    paramsNames: any[];
    controller: string;
    httpRequestMethod: HttpRequestMethod;
    hasResponseBodyDecorator: boolean = false;
    requestBodyParams: boolean[] = [];
    pathVariables: Map<number, string> = new Map<number, string>();

    call(req?: Request, res?: Response, next?: Function): any {

        let controller: Object = Container.get(this.controller);
        let method: Function = controller[this.methodName];
        let paramsValues: any[] =  this.getParamsValues(req, res);
        let dataToBeSent: any = method.call(controller, ...paramsValues);
        let controllerHandler: ControllerHandler = Container.controllerHandlers[this.controller];

        if (this.hasResponseBodyDecorator || controllerHandler.isRest) {
            if (controllerHandler.isRest) {
                this.sendJson(res, dataToBeSent);
            }else {
                this.sendData(res, dataToBeSent);
            }
        }else {
            // view Resolver
        }
    }

    getParamsValues(req: Request, res: Response): any[] {
        let paramsValues = [];

        for (let i = 0; i < this.paramsNames.length; i++) {
            paramsValues[i] = this.getParamValue(i, this.paramsNames[i], this.paramsTypes[i], req, res);
        }

        return paramsValues;
    }

    getParamValue(paramIndex: number, paramName: string, paramType: any, req: Request, res: Response) {
        let pathVariableName;
        if (this.requestBodyParams[paramName]) {
            return req.body;
        }
        else if (paramType === Request) {
            return req;
        }
        else if (paramType === Response) {
            return res;
        }
        else if (pathVariableName = this.pathVariables.get(paramIndex)) {
            return this.getPathVariableValue(req, pathVariableName);
        }
    }

    getPathVariableValue(req: Request, pathVariableName: string): string {
        return req.params[pathVariableName];
    }

    sendData(res: Response, data: any): void {
        if (data instanceof Promise) {
            <Promise<any>>data.then((dataToBeSent) => {
                res.send(dataToBeSent);
            });
        }
        else {
            res.send(data);
        }
    }

    sendJson(res: Response, data: any){
        if (data instanceof Promise) {
            <Promise<any>>data.then((dataToBeSent) => {
                res.json(dataToBeSent);
            });
        }
        else {
            res.json(data);
        }
    }

}
