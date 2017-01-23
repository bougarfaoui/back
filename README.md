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
Example 1:
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
} 

```
 - ```@Controller``` : class Decorator used to mark the class as request handler.
 - ```@Route``` : class Decorator used to specify the route handled by the controller.
 - ```@Get``` : method Decorator, when used on a method ,this method will handle all the GET requests corresponding to its route.


Example 2:
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

    getProduct(id : number) : Promise<Product>{
        return new Promise((resolve)=>{
            resolve(new Product(1,"Nutella",45));
        });
    }
    
    getProductName(id : number) : string{
      return "Nutella";
    }

} 

@Controller
@Route("/product")
class ProductController{

    constructor(
        private productService : ProductService
    ){}

    @Get("/:id")
    @ResponseBody
    getProduct(req : Request ,res : Response, id : number) : Promise<Product> {
        return this.productService.getProduct(id);
    }

    @Get("/name/:id")
    @ResponseBody
    getProduct(req : Request ,res : Response, id : number) : string {
        return this.productService.getProductName(id);
    }
    
    @Post("/")
    addProduct(@RequestBody product){
        console.log(product);
    }

}
```
 - ```@Service``` : class Decorator used to indicates that the class is injectable
 - ```@ResponseBody``` : method Decorator , indicates that the method return value should be bound to the web response body (if the return value is a promise the data holded by this promise will be sent).
 - ```@RequestBody``` : parameter Decorator , indicates that the method parameter should be bound to the web request body
 
