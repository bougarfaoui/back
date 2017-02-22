import {Back, BackApplication, RestController, Get, Route, PathVariable} from "./index";

import path = require("path");
import bodyParser = require("body-parser");
let express = Back.express;

@RestController
@Route("/")
class UserController{
    constructor() {}

    @Get("/:id/:name")
    getUser(@PathVariable("idd") id: number, @PathVariable("name") name: number): any{
        console.log(id);
        return {id : id, name};
    }
}

@BackApplication({
    set : {
        viewEngine : "",
        views : path.join(__dirname, "views"),
        viewCache : true,
        port : process.env.PORT || 3000
    },
    use : [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false }),
        express.static(path.join(__dirname, "public"))
    ]
})
class BackApp {}