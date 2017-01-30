import { Back, Controller, Service, Get, Post, Put, Route, Request, Response, RequestBody, ResponseBody } from "../index";
const request = require("supertest");
const assert = require("assert");
import "mocha";
import bodyParser = require("body-parser");

describe("@RequestBody", () => {
    class Product {
        constructor(
            private id: number,
            private label: string,
            private price: number
        ) {};
    }

    it("should get the product", done => {
        Back.reset();

        @Controller
        @Route("/product")
        class ProductController {
            constructor() {}

            @Post("/")
            @ResponseBody
            addProduct(req: Request, res: Response, @RequestBody product): string {
                assert.deepEqual({ id: 1, label: "Bimo", price: 45 }, product);
                return "done";
            }
        }

        let app = Back.express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        Back.prepare(app);
        request(app)
            .post("/product/")
            .send({ id: 1, label: "Bimo", price: 45 })
            .expect(JSON.stringify("done"), done);
    });
});
