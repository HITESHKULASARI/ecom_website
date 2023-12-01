import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js"

export default class OrderRepository{
    constructor(){
        this.collection = "order";
    }

    async placeOrder(userId){

        try{
            //get the client this is importing from the getClient in mongodb and 
            const client = getClient();
            // this session is importing 
            const session = client.startSession();
           
            // get the db
            const db = getDB();

            session.startTransaction();

            //1. get cartitems and calculate total amount
            const items = await this.getTotalAmount(userId,session);
            const finalTotalAmount = items.reduce((acc, item)=>acc+item.totalAmount, 0);



            //2. Create an order record
            //what is userId , FinalTotalAmount , and on which date order is placed
            const newOrder = new OrderModel(new ObjectId(userId),finalTotalAmount,new Date());
            await db.collection('Orders').insertOne(newOrder,{session});
            
            
            //3. Reduce the stock
            for(let item of items){
                await db.collection("products").updateOne(
                    //update which item stock
                    {_id: item.productID},
                    //decrement the value
                    {$inc:{stock: -item.quantity}},{session}
                )
            }

            // throw new Error("something went wrong bro");
            //4. Clear the cartItems .
            await db.collection("cartItems").deleteMany({
                userId: new ObjectId(userId)
            },{session}) ;
            //commitTransaction is the function it basically update the database and now our data base is in integration phase
            session.commitTransaction();
            //it's important to end the seesion which we have started
            session.endSession();
            return ;
        }catch(err){
            // there was any error in transaction they will come here
            //auger koi error pehle hote hai transaction mein toh asi pde rehte hai usme
            //toh transaction ko fresh bna deta hai ye function
            await session.abortTransaction();
            // and it's import for us to close the session
            session.endSession();
            console.log(err);
            throw new ApplicationError("something went wrong",err);
        }

        

    }

    async getTotalAmount(userId,session){

        //get the db
        const db = getDB();

        const items = await db.collection("cartItems").aggregate([
             
            {
                $match : {userID: new ObjectId(userId)}
            },
            {
            
                $lookup :{
                    from : "products",
                    localField: "productID",
                    foreignField:"_id",
                    as:"productInfo"
                }
            },{
                $unwind: "$productInfo"                
            },{
                $addFields : {
                    "totalAmount":{
                        $multiply:["$productInfo.price","$quantity"]
                    } 
                }
            }


        ],
        {session}

        ).toArray();

        return items;
        // console.log(items);
        // const finalTotalAmount = items.reduce((acc, item)=>acc+item.totalAmount, 0)
        

    }
}



