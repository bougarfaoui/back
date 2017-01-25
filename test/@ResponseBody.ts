import {Back,Controller ,Service,Get ,Post,Put,Route ,Request ,Response, RequestBody, ResponseBody } from "../index";
var request = require('supertest')
  , assert = require('assert');
import "mocha";
import  bodyParser = require("body-parser"); 
 
 
    describe('@ResponseBody', function(){
          class Product{
                constructor (
                   private id : number,
                   private label : string,
                   private price : number
                ){};
               
           }
           

         it('should return the product (string version)', function(done){
            Back.reset();
            
            @Controller
            @Route("/product")
            class ProductController{

                constructor(){}

                @Get("/:id")
                @ResponseBody
                getProduct(req : Request,res : Response,id : number) : string{
                   return "Bimo";                    
                }

            }
            
            let app  = Back.express();

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            
            Back.prepare(app);
            request(app)
            .get('/product/1') 
            .expect(JSON.stringify("Bimo"), done);
            
        });





           
        it('should return the product (object version)', function(done){
            Back.reset();
            @Service
            class ProductService{
                constructor(){}

                getProduct() : Product{
                    return new Product(1,"Bimo",45);
                }
            }

            @Controller
            @Route("/product")
            class ProductController{

                constructor(private productService : ProductService){}

                @Get("/:id")
                @ResponseBody
                getProduct(req : Request,res : Response,id : number) : Product{
                   return this.productService.getProduct();                    
                }

            }
            
            let app  = Back.express();

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            
            Back.prepare(app);
            request(app)
            .get('/product/1') 
            .expect(new Product(1,"Bimo",45), done);
            
        });








        it('should return the product (promise version)', function(done){
            Back.reset();
            @Service
            class ProductService{
                constructor(){}

                getProduct(): Promise<Product>{
                let promise : Promise<Product> = new Promise(resolve => {resolve()}); 
                    return promise.then(() => new Product(1,"Bimo",45));
                }
            }

            @Controller
            @Route("/product")
            class ProductController{

                constructor(private productService : ProductService){}

                @Get("/:id")
                @ResponseBody
                getProduct(req : Request,res : Response,id : number) : Promise<Product>{
                   return this.productService.getProduct();                    
                }

            }
            
            let app  = Back.express();

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            
            Back.prepare(app);
            request(app)
            .get('/product/1') 
            .expect(new Product(1,"Bimo",45), done);
            
        });




    });
 