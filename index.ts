import { express } from "express";
import { Container } from "./container";

export { HttpRequestMethod, Request, Response } from "./_http/http";
export { Service, Controller, Get, Post, Put, Delete, Route, RequestBody, ResponseBody } from "./decorators/decorators";

export class Back {
    static express = express;
    static Container = Container;

    static prepare(app) {
        for (let controller in Container.controllerHandlers) {
            let controllerHandler = Container.controllerHandlers[controller];
            let router = express.Router();

            for (let method in controllerHandler.methodsHandlers) {
                let methodHandler = controllerHandler.methodsHandlers[method];
                let _httpRequestMethod = methodHandler.httpRequestMethod;
                let httpRequestMethod = "";

                if (_httpRequestMethod === HttpRequestMethod.GET) {
                    httpRequestMethod = "get";
                }
                else if (_httpRequestMethod === HttpRequestMethod.POST) {
                    httpRequestMethod = "post";
                }
                else if (_httpRequestMethod === HttpRequestMethod.PUT) {
                    httpRequestMethod = "put";
                }
                else {
                     httpRequestMethod = "delete";
                }

                router[httpRequestMethod].call(router, methodHandler.route, (req, res, next) => {
                    methodHandler.call(req, res, next);
                });
            }

            app.use(controllerHandler.route, router);
        }
    }

    static reset () {
        Back.Container.instances = [];
        Back.Container.controllerHandlers = [];
        Back.Container.components = [];
    }
}
