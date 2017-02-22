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
describe("@ResponseBody", function () {
    var Product = (function () {
        function Product(id, label, price) {
            this.id = id;
            this.label = label;
            this.price = price;
        }
        ;
        return Product;
    }());
    it("should return the product (string version)", function (done) {
        index_1.Back.reset();
        var ProductController = (function () {
            function ProductController() {
            }
            ProductController.prototype.getProduct = function (req, res, id) {
                return "Bimo";
            };
            return ProductController;
        }());
        __decorate([
            index_1.Get("/:id"),
            index_1.ResponseBody,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [index_1.Request, index_1.Response, Number]),
            __metadata("design:returntype", String)
        ], ProductController.prototype, "getProduct", null);
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
            .get("/product/1")
            .expect(JSON.stringify("Bimo"), done);
    });
    it("should return the product (object version)", function (done) {
        index_1.Back.reset();
        var ProductService = (function () {
            function ProductService() {
            }
            ProductService.prototype.getProduct = function () {
                return new Product(1, "Bimo", 45);
            };
            return ProductService;
        }());
        ProductService = __decorate([
            index_1.Service,
            __metadata("design:paramtypes", [])
        ], ProductService);
        var ProductController = (function () {
            function ProductController(productService) {
                this.productService = productService;
            }
            ProductController.prototype.getProduct = function (req, res, id) {
                return this.productService.getProduct();
            };
            return ProductController;
        }());
        __decorate([
            index_1.Get("/:id"),
            index_1.ResponseBody,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [index_1.Request, index_1.Response, Number]),
            __metadata("design:returntype", Product)
        ], ProductController.prototype, "getProduct", null);
        ProductController = __decorate([
            index_1.Controller,
            index_1.Route("/product"),
            __metadata("design:paramtypes", [ProductService])
        ], ProductController);
        var app = index_1.Back.express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        index_1.Back.prepare(app);
        request(app)
            .get("/product/1")
            .expect(new Product(1, "Bimo", 45), done);
    });
    it("should return the product (promise version)", function (done) {
        index_1.Back.reset();
        var ProductService = (function () {
            function ProductService() {
            }
            ProductService.prototype.getProduct = function () {
                var promise = new Promise(function (resolve) {
                    resolve();
                });
                return promise.then(function () { return new Product(1, "Bimo", 45); });
            };
            return ProductService;
        }());
        ProductService = __decorate([
            index_1.Service,
            __metadata("design:paramtypes", [])
        ], ProductService);
        var ProductController = (function () {
            function ProductController(productService) {
                this.productService = productService;
            }
            ProductController.prototype.getProduct = function (req, res, id) {
                return this.productService.getProduct();
            };
            return ProductController;
        }());
        __decorate([
            index_1.Get("/:id"),
            index_1.ResponseBody,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [index_1.Request, index_1.Response, Number]),
            __metadata("design:returntype", Promise)
        ], ProductController.prototype, "getProduct", null);
        ProductController = __decorate([
            index_1.Controller,
            index_1.Route("/product"),
            __metadata("design:paramtypes", [ProductService])
        ], ProductController);
        var app = index_1.Back.express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        index_1.Back.prepare(app);
        request(app)
            .get("/product/1")
            .expect(new Product(1, "Bimo", 45), done);
    });
});
