import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js"

export default class CartItemsRepository{
    
    constructor(){
        this.cartItem = "cartItems";
    }

    async add(productID, userID, quantity){
        try{
            //get the db
            const db = getDB();
            //get the collection 
            const collection = db.collection(this.cartItem);

            // //insert the cartItem
            // await collection.insertOne({productID:new ObjectId(productID), userID : new ObjectId(userID), quantity});

            //best way for updating the quantity
            await collection.updateOne({productID:new ObjectId(productID),userID:new ObjectId(userID)},
            {$inc:{
                quantity:quantity
            }},
            {upsert:true}
            )

        }catch(err){
            console.log(err);
            throw new ApplicationError(err,400);
        }
        
    }

    async get(userID){
          //get the db
          const db = getDB();
          //get the collection
          const collection = db.collection(this.cartItem);

          //find cartItem
          return await collection.find({userID: new ObjectId(userID)}).toArray();
          


    }

    async delete(cartItemID,userID){
          
        //get the db
        const db = getDB();
        //get the collection
        const collection = db.collection(this.cartItem);

        //deleting the added cart
        const result = await collection.deleteOne({userID: new ObjectId(userID),_id:new ObjectId(cartItemID)});

        return result.deletedCount>0;
    }

}