import { MongoClient } from "mongodb";

//clients wants to know which database we are tring to connect
const url = "mongodb://127.0.0.1:27017/ecomdb";

let client ;
export const connectToMongoDB = () =>{
    console.log("heyy");
    MongoClient.connect(url)
     .then((clientInstance) => {
      
        client = clientInstance;
        console.log('Mongodb is connected');
     })
     .catch((err)=>{
        console.log(err);
     })
}

export const getDB = ()=>{
    return client.db();
}



