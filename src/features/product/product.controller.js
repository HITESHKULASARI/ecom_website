import ProductModel from './product.model.js';
import ProductRepository from './product.repository.js';
import ApplicationError from '../../error-handler/applicationError.js';

export default class ProductController {
  
  constructor(){
    this.ProductRepository = new ProductRepository();
  }
  //done
  async getAllProducts(req, res) {
    const products = await this.ProductRepository.getAll();
    console.log(products);
    
    res.status(200).send(products);
  }
  // done
  async addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = new ProductModel(name,parseFloat(price),sizes.split(','),req.file.filename);
    const createdRecord = await this.ProductRepository.add(newProduct);
    res.status(201).send(createdRecord);
  }

  async rateProduct(req, res, next) {
    console.log(req.query);
    try{
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;
      await this.ProductRepository.rateProduct(
        userID,
        productID, 
        rating
        );
        return res
          .status(200)
          .send('Rating has been added');
    } catch(err){
      console.log("Passing error to middleware");
      next(err);
    }

    }
   

  async getOneProduct(req, res) {
    const id = req.params.id;
    const product = await this.ProductRepository.get(id);
    if (!product) {
      res.status(404).send('Product not found');
    } else {
      return res.status(200).send(product);
    }
  }

  async filterProducts(req, res) {
    try{
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = await this.ProductRepository.filter(
          minPrice,
          maxPrice,
          category
        );
        res.status(200).send(result);

    }catch(err){
       throw new ApplicationError(err,500);
    }
    
  }

  async getAveragePrice(req,res){

    try{

      const result = await this.ProductRepository.getAveragePrice();
      res.status(200).send(result);

    }catch(err){
       throw new ApplicationError(err,500);
    }

  }
}
