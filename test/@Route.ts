import { Back, Controller, Service, Get, Route, Request, Response, RequestBody, ResponseBody } from "../index";
var request = require('supertest')
    , assert = require('assert');
import "mocha";
import bodyParser = require("body-parser");

describe('@Route', function () {
 

        it('should return value', function (done) {
            Back.reset();

            @Controller
            @Route("/product")
            class ProductController {

                constructor() { }

                @Get("/")
                someMethod(req : Request, res : Response) {
                    res.end("done");
                }


            }

            let app = Back.express();

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));

            Back.prepare(app);
            request(app)
                .get('/product')
                .expect("done",done);

        });

        it('should return value', function (done) {
            Back.reset();

            @Controller
            @Route("/product")
            class ProductController {

                constructor() { }

                @Get("/deals/")
                otherMethod(req : Request, res : Response) {
                    res.end("done");
                }

            }

            let app = Back.express();

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));

            Back.prepare(app);
            request(app)
                .get('/product/deals')
                .expect("done", done);

        });
 

 



});
