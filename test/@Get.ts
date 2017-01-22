import { Back, Controller, Service, Get, Post, Put, Route, Request, Response, RequestBody, ResponseBody } from "../back";
var request = require('supertest')
    , assert = require('assert');
import "mocha";
import bodyParser = require("body-parser");

describe('@Get', function () {

    describe('@Get simple', function () {

        it('should return the value', function (done) {
            Back.reset();

            @Controller
            @Route("/product")
            class ProductController {

                constructor() { }

                @Get("/")
                someMethod(req: Request, res: Response) {
                    res.end("I just received data");
                }

            }

            let app = Back.express();

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));

            Back.prepare(app);
            request(app)
                .get('/product/')
                .expect("I just received data", done);

        });
    });



    describe('@Get with /:param', function () {

        it('should return the value', function (done) {
            Back.reset();

            @Controller
            @Route("/product")
            class ProductController {

                constructor() { }

                @Get("/:id")
                someMethod(req: Request, res: Response, id: number) {
                    assert.equal(id, 45);
                    res.end("I just received data");
                }

            }

            let app = Back.express();

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));

            Back.prepare(app);
            request(app)
                .get('/product/45')
                .expect("I just received data", done);

        });
    });


     describe('@Get with ?param=value&param=value', function () {

        it('should return the value', function (done) {
            Back.reset();

            @Controller
            @Route("/product")
            class ProductController {

                constructor() { }

                @Get("/")
                someMethod(req: Request, res: Response, name: string, price: string) {
                    assert.equal(name, "bimo");
                    assert.equal(price, 78);
                    res.end("I just received data");
                }

            }

            let app = Back.express();

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));

            Back.prepare(app);
            request(app)
                .get('/product?name=bimo&price=78')
                .expect("I just received data", done);

        });
    });




});
