"use strict";
var http_1 = require("../_http/http");
var container_1 = require("../container");
/**
 * @wahtItDoes holds all information about the method of a controller
 */
var MethodHandler = (function () {
    function MethodHandler() {
        this.hasResponseBodyDecorator = false;
        this.requestBodyParams = [];
        this.pathVariables = new Map();
    }
    MethodHandler.prototype.call = function (req, res, next) {
        var controller = container_1.Container.get(this.controller);
        var method = controller[this.methodName];
        var paramsValues = this.getParamsValues(req, res);
        var dataToBeSent = method.call.apply(method, [controller].concat(paramsValues));
        var controllerHandler = container_1.Container.controllerHandlers[this.controller];
        if (this.hasResponseBodyDecorator || controllerHandler.isRest) {
            if (controllerHandler.isRest) {
                this.sendJson(res, dataToBeSent);
            }
            else {
                this.sendData(res, dataToBeSent);
            }
        }
        else {
        }
    };
    MethodHandler.prototype.getParamsValues = function (req, res) {
        var paramsValues = [];
        for (var i = 0; i < this.paramsNames.length; i++) {
            paramsValues[i] = this.getParamValue(i, this.paramsNames[i], this.paramsTypes[i], req, res);
        }
        return paramsValues;
    };
    MethodHandler.prototype.getParamValue = function (paramIndex, paramName, paramType, req, res) {
        var pathVariableName;
        if (this.requestBodyParams[paramName]) {
            return req.body;
        }
        else if (paramType === http_1.Request) {
            return req;
        }
        else if (paramType === http_1.Response) {
            return res;
        }
        else if (pathVariableName = this.pathVariables.get(paramIndex)) {
            return this.getPathVariableValue(req, pathVariableName);
        }
    };
    MethodHandler.prototype.getPathVariableValue = function (req, pathVariableName) {
        return req.params[pathVariableName];
    };
    MethodHandler.prototype.sendData = function (res, data) {
        if (data instanceof Promise) {
            data.then(function (dataToBeSent) {
                res.send(dataToBeSent);
            });
        }
        else {
            res.send(data);
        }
    };
    MethodHandler.prototype.sendJson = function (res, data) {
        if (data instanceof Promise) {
            data.then(function (dataToBeSent) {
                res.json(dataToBeSent);
            });
        }
        else {
            res.json(data);
        }
    };
    return MethodHandler;
}());
exports.MethodHandler = MethodHandler;
