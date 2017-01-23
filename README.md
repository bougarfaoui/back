# back 
Back.js : Small MVC Framework for Node.js written in Typescript and built on top of Express.js

[![Build Status](https://travis-ci.org/bougarfaoui/back.svg?branch=master)](https://travis-ci.org/bougarfaoui/back)

## Quick start

```
$ npm install -g back-starter
```
Create the app
```
$ back
```
Install dependencies
```
$ npm install
```
Start your app at ``` http://localhost:3000/ ```
```
$ npm start
```
## Quick Tutorial
Example 1 (simple GET request):
```ts
import {Controller ,Get ,Route } from "back-js";

@Controller
@Route("/")
class HomeController{

    constructor(){}

    @Get("/")
    greet() {
        console.log("hello World");
    }
    
    @Get("/greet")
    anotherGreet() {
        console.log("another hello World");
    }
} 

```
 - ```@Controller``` : class Decorator used to mark the class as request handler.
 - ```@Route``` : class Decorator used to specify the route handled by the controller.
 - ```@Get``` : method Decorator, when used on a method ,this method will handle all the GET requests corresponding to its route.

in this example we created a controller ```HomeController``` that handles all requests coming from ```/``` route, inside the controller we have two methods ```greet``` and ```anotherGreet```, these methods point to ```/``` and ```/greet``` respectively. We used ```@Get(route)``` to indicate that the method will handle any web request ```GET``` coming from the route specified in the Decorator.



Example 2 (Request ,Reponse and Route parameter):
```ts
import {Controller ,Get ,Post,Route ,Request ,Response } from "back-js";


@Controller
@Route("/product")
class ProductController{

    constructor(){}

    @Get("/:id")
    getProduct(req : Request ,res : Response, id : number) {
        console.log(id);
        // do something
        res.send("not found");
    }
    
    @Post("/")
    addProduct(res : Response,id : number, name : string, price : number){
        res.end("done");
    }

}
```
in this example we controller ```ProductController``` that points to ```/product``` route and has two methods ```getProduct``` and ```addProduct``` :
     - the first method ```getProduct``` has ```@Get("/:id")``` decorator on it, this means that it points to the ```/product/anything``` route .The route parameter in this case ```id``` can be accessed as a parameter of ```getProduct``` method.
 - ```@Service``` : class Decorator used to indicates that the class is injectable
 - ```@ResponseBody``` : method Decorator , indicates that the method return value should be bound to the web response body (if the return value is a promise the data holded by this promise will be sent).
 - ```@RequestBody``` : parameter Decorator , indicates that the method parameter should be bound to the web request body
 
