
import express from "express";
import OrderController from "./order.controller.js";
const orderRouter = express.Router();

const orderController = new OrderController();

orderRouter.get('/',(req,res)=>{
    orderController.placeOrder(req,res);
});

export default orderRouter;