import ApplicationError from "../../error-handler/applicationError.js";
import OrderRepository from "./order.repository.js";


export default class OrderController{

      constructor(){
         this.OrderRepository = new OrderRepository();
      }

      async  placeOrder(req,res){
          
        try{
            const userId = req.userID;

            await this.OrderRepository.placeOrder(userId);
            
            return res.status(201).send("order is placed");
        }catch(err){
            throw new ApplicationError(err,500);
        }


      }

}