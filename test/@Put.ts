import { Back, Controller, Put, Route, Request, Response, RequestBody } from "../index";
const request = require("supertest");
const assert = require("assert");
import "mocha";
import bodyParser = require("body-parser");

describe("@Put", () => {
    it("should be equal", done => {
        Back.reset();

        @Controller
        @Route("/product")
        class ProductController {
            constructor() {}

            @Put("/:product_id")
            someMethod(req: Request, res: Response, product_id: number, @RequestBody newProduct) {
                assert.equal(product_id, 45);
                assert.deepEqual({id: 45 , name: "bimo", price: 45}, req.body);
                assert.deepEqual({id: 45 , name: "bimo", price: 45}, newProduct);
                res.end("I just upated data");
            }
        }

        let app = Back.express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        Back.prepare(app);
        request(app)
            .put("/product/45")
            .send({id: 45 , name: "bimo", price: 45 })
            .expect("I just upated data", done);
    });
});
