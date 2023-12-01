import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ApplicationError from "../../error-handler/applicationError.js";
import UserRepository from './user.repository.js';
import config from '../../../env.js'


export default class UserController {
  
  constructor(){
    this.userRepository = new UserRepository();
  }

  async resetPassword(req,res,next){
    const userID = req.userID;
    const newPassword = req.body.newPassword;
    const hashPassword = await bcrypt.hash(password,12);
    try{
      await this.userRepository.resetPassword(userID, hashedPassword)
      res.status(200).send("Password is updated");
     }catch(err){
      console.log(err);
      console.log("passing the error to the middleware");
      next(err);
     }
  }
  
  async signUp(req, res) {
    const {
      name,
      email,
      password,
      type,
    } = req.body;
    const hashPassword = await bcrypt.hash(password,12);
    console.log(hashPassword);
    try{
      const newUser = await UserModel.signUp(
        name,
        email,
        hashPassword,
        type
      );
      
      await this.userRepository.signUp(newUser);
      
      res.status(201).send('user is added');

    }catch(err){
       
      throw new ApplicationError(err,404);
    }
    
  }

  async signIn(req, res) {
    try{
          const user = await this.userRepository.findByEmail(
            req.body.email
          );
          if(!user){
            return res
              .status(400)
              .send('Incorrect Credentials');
          }else{
            //compare password with hash password
            console.log(typeof(req.body.password),typeof(user.password));
            const result = await bcrypt.compare(req.body.password,user.password);

            if(result){
              // 1. Create token.
                  const token = jwt.sign(
                  {
                    userID: user._id,
                    email: user.email,
                  },
                  process.env.JWT_SECRET ,
                  {
                    expiresIn: '1h',
                  }
                );
                // 2. Send token.
                return res.status(200).send(token);
            }else{
              res.status(400).send('password is not match');
            }

            }
            
            
      

    }catch(err){

       throw new ApplicationError(err,400);

    }
     }
}



