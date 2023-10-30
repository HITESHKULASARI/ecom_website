import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";


export default class ProductRepository{

    async add(newProduct){
        try{
            //get the database
            const db = getDB();
            //get the collection here i am doing hard coding 
            const collection = db.collection("products");
            //insert the document
            await collection.insertOne(newProduct);
            
            return newProduct;
        }catch(err){
            throw new ApplicationError(err,500);
        }
    }

    async getAll(){
        try{
            //get the database
            const db = getDB();
            //get the collection here i am doing hard coding
            const collection = db.collection("products");
            //insert the document
            return await collection.find().toArray();
        }catch(err){
            throw new ApplicationError(err,500);
        }
    }

    async get(id){
        try{
            //get the database
            const db = getDB();
            //get the collection here i am doing hard coding
            const collection = db.collection("products");
            //insert the document
            return await collection.findOne({_id:new ObjectId(id)});
        }catch(err){
            throw new ApplicationError(err,500);
        }
    }

    async filter(minPrice,maxPrice,category){
        try{
            //get the database
            const db = getDB();
            //get the collection 
            const collection = db.collection("products");
            //insert the document
            let filterExpression = {};
            if(minPrice){
                filterExpression.price = {$gte:parseFloat(minPrice)};
            }
            if(maxPrice){
                filterExpression.price = {...filterExpression.price,$lte:parseFloat(maxPrice)}
            }
            if(category){
                filterExpression.category = category
            }

            return await collection.find(filterExpression).toArray();

        }catch(err){
            throw new ApplicationError("something went wrong while filtering",500);
        }
    }

    async rateProduct(userID,productID,rating){

        try{
            //get the database
            const db = getDB();
            //get the collection
            const collection = db.collection('products');
            
            await collection.updateOne({_id:new ObjectId(productID)},{
                $push:{ratings:{userID:new ObjectId(userID),rating}}
            })


        }catch(err){

            throw new ApplicationError(err,500);
        }

    }
}