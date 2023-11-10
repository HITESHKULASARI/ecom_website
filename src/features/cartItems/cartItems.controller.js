import ApplicationError from "../../error-handler/applicationError.js";
import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartitems.repository.js";

export class CartItemsController {
    constructor(){
        this.cartItemsRepository = new CartItemsRepository();
    }
    async add(req, res) {
        try{
            const { productID, quantity } = req.body;
            const userID = req.userID;
            

            await this.cartItemsRepository.add(productID, userID, quantity);
            res.status(201).send("Cart is updated");


        }catch(err){
            console.log(err);
            res.status(400).send(err);
        }
        
    }

    async get(req, res){
        try{
            const userID = req.userID;
            
            const items = await this.cartItemsRepository.get(userID);
            return res.status(200).send(items);

        }catch(err){
            console.log(err);
            throw new ApplicationError(err,400);
        }
        
    }

    async delete(req, res) {
        const userID = req.userID;
        const cartItemID = req.params.id;
        const result = await this.cartItemsRepository.delete(
            cartItemID,
            userID
        );
        if (!result) {
            return res.status(404).send("cart item not found");
        }
        return res
        .status(200)
        .send('Cart item is removed');
    }
}