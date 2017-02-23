"use strict";
var express = require("express");
var container_1 = require("./container");
var http_1 = require("./_http/http");
var utils_1 = require("./utils/utils");
var http_2 = require("./_http/http");
exports.HttpRequestMethod = http_2.HttpRequestMethod;
exports.Request = http_2.Request;
exports.Response = http_2.Response;
var HttpMethodDecorators_1 = require("./decorators/HttpMethodDecorators");
exports.Get = HttpMethodDecorators_1.Get;
exports.Post = HttpMethodDecorators_1.Post;
exports.Put = HttpMethodDecorators_1.Put;
exports.Delete = HttpMethodDecorators_1.Delete;
var ResponseBody_1 = require("./decorators/ResponseBody");
exports.ResponseBody = ResponseBody_1.ResponseBody;
var RequestBody_1 = require("./decorators/RequestBody");
exports.RequestBody = RequestBody_1.RequestBody;
var PathVariable_1 = require("./decorators/PathVariable");
exports.PathVariable = PathVariable_1.PathVariable;
var Route_1 = require("./decorators/Route");
exports.Route = Route_1.Route;
var Controller_1 = require("./decorators/Controller");
exports.Controller = Controller_1.Controller;
var RestController_1 = require("./decorators/RestController");
exports.RestController = RestController_1.RestController;
var Service_1 = require("./decorators/Service");
exports.Service = Service_1.Service;
var BackApplication_1 = require("./BackApplication");
exports.BackApplication = BackApplication_1.BackApplication;
var Back = (function () {
    function Back() {
    }
    Back.prepare = function (app) {
        Back.applyConfigs(app);
        for (var controller in container_1.Container.controllerHandlers) {
            var controllerHandler = container_1.Container.controllerHandlers[controller];
            var router = express.Router();
            var _loop_1 = function (method) {
                var methodHandler = controllerHandler.methodsHandlers[method];
                var _httpRequestMethod = methodHandler.httpRequestMethod;
                var httpRequestMethod = "";
                if (_httpRequestMethod === http_1.HttpRequestMethod.GET) {
                    httpRequestMethod = "get";
                }
                else if (_httpRequestMethod === http_1.HttpRequestMethod.POST) {
                    httpRequestMethod = "post";
                }
                else if (_httpRequestMethod === http_1.HttpRequestMethod.PUT) {
                    httpRequestMethod = "put";
                }
                else {
                    httpRequestMethod = "delete";
                }
                router[httpRequestMethod].call(router, methodHandler.route, function (req, res, next) {
                    methodHandler.call(req, res, next);
                });
            };
            for (var method in controllerHandler.methodsHandlers) {
                _loop_1(method);
            }
            app.use(controllerHandler.route, router);
        }
    };
    // for testing
    Back.reset = function () {
        Back.Container.instances = [];
        Back.Container.controllerHandlers = [];
        Back.Container.components = [];
    };
    Back.applyConfigs = function (app) {
        Back
            .configs
            .use
            .forEach(function (middleware) {
            app.use(middleware);
        });
        for (var setting in Back.configs.set) {
            var _setting = utils_1.splitCamelCase(setting).toLocaleLowerCase();
            app.set(_setting, Back.configs.set[setting]);
        }
    };
    return Back;
}());
Back.express = express;
Back.Container = container_1.Container;
exports.Back = Back;
