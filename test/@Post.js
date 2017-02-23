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
var index_1 = require("../index");
var request = require("supertest");
var assert = require("assert");
require("mocha");
var bodyParser = require("body-parser");
describe("@Post", function () {
    describe("@Post simple", function () {
        it("should be equal", function (done) {
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
                index_1.Post("/"),
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
                .post("/product/")
                .expect("I just received data", done);
        });
    });
    describe("@Post with body", function () {
        it("should be equal", function (done) {
            index_1.Back.reset();
            var ProductController = (function () {
                function ProductController() {
                }
                ProductController.prototype.someMethod = function (req, res, id, product) {
                    assert.equal(id, 45);
                    assert.deepEqual({ id: 45, name: "bimo", price: 45 }, req.body);
                    assert.deepEqual({ id: 45, name: "bimo", price: 45 }, product);
                    res.end("I just received data");
                };
                return ProductController;
            }());
            __decorate([
                index_1.Post("/:id"),
                __param(3, index_1.RequestBody),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [index_1.Request, index_1.Response, Number, Object]),
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
                .post("/product/45")
                .send({ id: 45, name: "bimo", price: 45 })
                .expect("I just received data", done);
        });
    });
});
