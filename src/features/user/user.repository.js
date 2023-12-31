import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import ApplicationError from "../../error-handler/applicationError.js";



const UserModel = mongoose.model('User',userSchema);


export default class UserRepository{

      async signUp(user){

           try{
             
            //creating the instance
            const newUser = new UserModel(user);

            await newUser.save();

            return newUser;
            



           }catch(err){
              console.log(err);
              throw new ApplicationError("Something went wrong",500);
           }

      }

      async signIn(email,password){
            
        try{
             
            return await UserModel.findOne({email,password});
            



           }catch(err){
              console.log(err);
              throw new ApplicationError("Something went wrong",500);
           }

      }

      async findByEmail(email) {
            try{
                return await UserModel.findOne({email});
            }catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
      }
}