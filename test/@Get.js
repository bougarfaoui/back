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
var index_1 = require("../index");
var request = require("supertest");
var assert = require("assert");
require("mocha");
var bodyParser = require("body-parser");
describe("@Get", function () {
    describe("@Get simple", function () {
        it("should return the value", function (done) {
            index_1.Back.reset();
            var ProductController = (function () {
                function ProductController() {
                }
                ProductController.prototype.someMethod = function (req, res) {
                    res.end("I just received data");
                };
                return ProductController;
            }());
            __decorate([
                index_1.Get("/"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [index_1.Request, index_1.Response]),
                __metadata("design:returntype", void 0)
            ], ProductController.prototype, "someMethod", null);
            ProductController = __decorate([
                index_1.Controller,
                index_1.Route("/product"),
                __metadata("design:paramtypes", [])
            ], ProductController);
            var app = index_1.Back.express();
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            index_1.Back.prepare(app);
            request(app)
                .get("/product/")
                .expect("I just received data", done);
        });
    });
    describe("@Get with /:param", function () {
        it("should return the value", function (done) {
            index_1.Back.reset();
            var ProductController = (function () {
                function ProductController() {
                }
                ProductController.prototype.someMethod = function (req, res, id) {
                    assert.equal(id, 45);
                    res.end("I just received data");
                };
                return ProductController;
            }());
            __decorate([
                index_1.Get("/:id"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [index_1.Request, index_1.Response, Number]),
                __metadata("design:returntype", void 0)
            ], ProductController.prototype, "someMethod", null);
            ProductController = __decorate([
                index_1.Controller,
                index_1.Route("/product"),
                __metadata("design:paramtypes", [])
            ], ProductController);
            var app = index_1.Back.express();
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            index_1.Back.prepare(app);
            request(app)
                .get("/product/45")
                .expect("I just received data", done);
        });
    });
    describe("@Get with ?param=value&param=value", function () {
        it("should return the value", function (done) {
            index_1.Back.reset();
            var ProductController = (function () {
                function ProductController() {
                }
                ProductController.prototype.someMethod = function (req, res, name, price) {
                    assert.equal(name, "bimo");
                    assert.equal(price, 78);
                    res.end("I just received data");
                };
                return ProductController;
            }());
            __decorate([
                index_1.Get("/"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [index_1.Request, index_1.Response, String, String]),
                __metadata("design:returntype", void 0)
            ], ProductController.prototype, "someMethod", null);
            ProductController = __decorate([
                index_1.Controller,
                index_1.Route("/product"),
                __metadata("design:paramtypes", [])
            ], ProductController);
            var app = index_1.Back.express();
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            index_1.Back.prepare(app);
            request(app)
                .get("/product?name=bimo&price=78")
                .expect("I just received data", done);
        });
    });
});
