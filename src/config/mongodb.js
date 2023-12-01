import { MongoClient } from "mongodb";
import config from '../../env.js'
//clients wants to know which database we are tring to connect


let client ;
export const connectToMongoDB = () =>{
    console.log("heyy");
    MongoClient.connect(process.env.DB_URL)
     .then((clientInstance) => {
      
        client = clientInstance;
        console.log('Mongodb is connected');
        createIndex(client.db());
     })
     .catch((err)=>{
        console.log(err);
     })
}

export const getDB = ()=>{
    return client.db();
}

export const getClient = ()=>{
    return client;
}


const createIndex = async(db)=>{
    try{
      await db.collection("products").createIndex({price:1});
    }catch(err){
      console.log(err);
    }

    console.log("indexes are created");
    
}