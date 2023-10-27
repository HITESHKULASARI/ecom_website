import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';
import ApplicationError from "../../error-handler/applicationError.js";
import UserRepository from './user.repository.js';


export default class UserController {
  
  constructor(){
    this.userRepository = new UserRepository();
  }
  
  async signUp(req, res) {
    const {
      name,
      email,
      password,
      type,
    } = req.body;
    try{
      const newUser = await UserModel.signUp(
        name,
        email,
        password,
        type
      );
      
      this.userRepository.signUp(newUser);
      
      res.status(201).send('user is added');

    }catch(err){
       
      throw new ApplicationError(err,404);
    }
    
  }

  async signIn(req, res) {
    try{
          const result = await this.userRepository.signIn(
            req.body.email,
            req.body.password
          );
          if(!result){
            return res
              .status(400)
              .send('Incorrect Credentials');
          }else{
            // 1. Create token.
            const token = jwt.sign(
              {
                userID: result.id,
                email: result.email,
              },
              'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
              {
                expiresIn: '1h',
              }
            );
            // 2. Send token.
            return res.status(200).send(token);
            }
            
      

    }catch(err){

       throw new ApplicationError(err,400);

    }
     }
}



