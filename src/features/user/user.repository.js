
import ApplicationError from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";
export default class UserRepository{
    
    async signUp(newUser){
        
        try{
             //1.get the database
            const db = getDB();
            //2.get the collection
            const collection = db.collection("users");
            //3.insert the document
            await collection.insertOne(newUser);

        }catch(err){
            throw new ApplicationError(err,400);
        }
    }

    async signIn(email){
        try{
            //1.get the database
            const db = getDB();
            //2.get the collection
            const collection = db.collection("users");
            //3.find the document
            return await collection.findOne({email});


        }catch(err){
            throw new ApplicationError(err,400);
        }
    }

}