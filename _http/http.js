"use strict";
/**
 * Http request methods
 */
var HttpRequestMethod;
(function (HttpRequestMethod) {
    HttpRequestMethod[HttpRequestMethod["GET"] = 0] = "GET";
    HttpRequestMethod[HttpRequestMethod["POST"] = 1] = "POST";
    HttpRequestMethod[HttpRequestMethod["PUT"] = 2] = "PUT";
    HttpRequestMethod[HttpRequestMethod["DELETE"] = 3] = "DELETE";
    HttpRequestMethod[HttpRequestMethod["ALL"] = 4] = "ALL";
})(HttpRequestMethod = exports.HttpRequestMethod || (exports.HttpRequestMethod = {}));
;
/**
 * I use class instead of interface because TypeScript only supports
 * basic type serialization (Boolean, Number, class, ...)
 */
/**
 * Request has the same properties of Request object in Express.js
 */
var Request = (function () {
    function Request() {
    }
    return Request;
}());
exports.Request = Request;
;
/**
 * Response has the same properties of Response object in Express.js
 */
var Response = (function () {
    function Response() {
    }
    return Response;
}());
exports.Response = Response;
;
