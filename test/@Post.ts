import { Back, Controller, Post, Route, Request, Response, RequestBody } from "../index";
const request = require("supertest");
const assert = require("assert");
import "mocha";
import bodyParser = require("body-parser");

describe("@Post", () => {
    describe("@Post simple", () => {
        it("should be equal", done => {
            Back.reset();

            @Controller
            @Route("/product")
            class ProductController {
                constructor() {}

                @Post("/")
                someMethod(req: Request, res: Response) {
                    res.end("I just received data");
                }
            }

            let app = Back.express();

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));

            Back.prepare(app);
            request(app)
                .post("/product/")
                .expect("I just received data", done);
        });
    });

    describe("@Post with body", () => {
        it("should be equal", done => {
            Back.reset();

            @Controller
            @Route("/product")
            class ProductController {
                constructor() {}

                @Post("/:id")
                someMethod(req: Request, res: Response, id: number, @RequestBody product) {
                    assert.equal(id, 45);
                    assert.deepEqual({id: 45 , name: "bimo", price: 45}, req.body);
                    assert.deepEqual({id: 45 , name: "bimo", price: 45}, product);
                    res.end("I just received data");
                }
            }

            let app = Back.express();

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));

            Back.prepare(app);
            request(app)
                .post("/product/45")
                .send({id: 45 , name: "bimo", price: 45 })
                .expect("I just received data", done);
        });
    });
});
