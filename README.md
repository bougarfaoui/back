
<img alt="Back" title="Back" src="http://gdurl.com/58Bm" width="280" height="100">

:sparkles: Back.js: MVC Framework for Node.js written in Typescript and built on top of Express.js :sparkles:

[![Build Status](https://travis-ci.org/bougarfaoui/back.svg?branch=master)](https://travis-ci.org/bougarfaoui/back)

back.js is a new MVC framework for node written totally in Typescript and inspired from the popular spring MVC in java,
it has a system of dependency injection and it's easy to use. Back.js is very new, it's not ready for production yet and needs some contributions.


:star2: There are a lot of javascript frameworks for node.js out there. This one is different :
 - Provides great TypeScript developer experience
 - Simple and flexible API
 - MVC Architecture

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
### Example 1 (simple GET request):
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


### Example 2 (Request ,Reponse and Route parameter):
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
Here we have acontroller ```ProductController``` that points to ```/product``` route and has two methods ```getProduct``` and ```addProduct``` :

the first method ```getProduct``` has ```@Get("/:id")``` decorator on it, this means that it points to the ```/product/anything``` route .The route parameter in this case ```id``` can be accessed as a parameter of ```getProduct``` method. The ```req``` and ```res``` objects are the same as those in Express.js .

the second method ```addProduct``` points to the ```/product/``` route and handles requests of type ```POST```. it has four parameters the last three ones are ```id```, ```name``` and ```price``` ,each parameter holds the value of the property that has the same name in the request body , fro example if the client send the object below :

```json
{"id":12,"name":"nutella","price":20}
```

the result :
```ts
    @Post("/")
    addProduct(res : Response, id : number, name : string, price : number, other : string){
        console.log(id); // 12
        console.log(name); // nutella
        console.log(price); // 20
        console.log(other); // undefined
    }
```
 
### Example 3 (@RequestBody, @ResponseBody, @Service):
 
 ```ts
    import {Controller,Service ,Get ,Post,Route ,Request ,Response, RequestBody, ResponseBody } from "back-js";
    
    class Product{
        constructor(
            private id : number,
            private label : string,
            private price : number,
        ){}
    }
    
    @Service
    class ProductService{
    
        constructor(){}

        getProduct() : Promise<Product>{
            return new Promise((resolve)=>{
                resolve(new Product(1,"Bimo",45));
            });
        }

    }
   
    @Controller
    @Route("/product")
    class ProductController{
    
        constructor(
            private productService : ProductService
        ){}

        @Get("/")
        @ResponseBody
        getProduct(req : Request ,res : Response ) : Promise<Product> {
            return this.productService.getProduct();
        }   

        @Post("/")
        @ResponseBody
        addProduct(@RequestBody product) : string{
            console.log(product);
            return "done";
        }
    } 
 
 ```
 - ```@Service``` : class Decorator used to indicates that the class is injectable
 - ```@ResponseBody``` : method Decorator , indicates that the method return value should be bound to the web response body (if the return value is a promise the data holded by this promise will be sent).
 - ```@RequestBody``` : parameter Decorator , indicates that the method parameter should be bound to the web request body
 
in this example we have a controller```ProductController``` with one dependency ```productService``` that will be injected automatically by the framework,this controller has also two methods :

the first one ```getProduct``` it has ```@ResponseBody``` decorator on it and returns a promise this means that the value holded in the promise will be sent in the web response body.

the second one ```addProduct``` has ```@ResponseBody``` decorator on its parameter ```product``` this means that web request body will be bound to the ```product``` parameter.

## Contribution

1- Fork

2- Do your magic

3- pull request :smile:

## License

MIT
