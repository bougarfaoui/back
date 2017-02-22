"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var index_1 = require("./index");
var path = require("path");
var bodyParser = require("body-parser");
var express = index_1.Back.express;
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.getUser = function (id, name) {
        console.log(id);
        return { id: id, name: name };
    };
    return UserController;
}());
__decorate([
    index_1.Get("/:id/:name"),
    __param(0, index_1.PathVariable("idd")), __param(1, index_1.PathVariable("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUser", null);
UserController = __decorate([
    index_1.RestController,
    index_1.Route("/"),
    __metadata("design:paramtypes", [])
], UserController);
var BackApp = (function () {
    function BackApp() {
    }
    return BackApp;
}());
BackApp = __decorate([
    index_1.BackApplication({
        set: {
            viewEngine: "",
            views: path.join(__dirname, "views"),
            viewCache: true,
            port: process.env.PORT || 3000
        },
        use: [
            bodyParser.json(),
            bodyParser.urlencoded({ extended: false }),
            express.static(path.join(__dirname, "public"))
        ]
    }),
    __metadata("design:paramtypes", [])
], BackApp);
