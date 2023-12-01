import mongoose ,{Schema} from 'mongoose';


export const cartSchema = new Schema({
    productID:{
        type: mongoose.Schema.Types.ObjectId,
        //refer to product collection in data base
        ref:'Product'
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        //refer to user collection in db
        ref:'User'
    },
    quantity: Number
})