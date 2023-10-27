import {getDB} from "../../config/mongodb.js";


export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this.id = id;
  }

  static async signUp(name, email, password, type) {
    // const newUser = new UserModel(
    //   name,
    //   email,
    //   password,
    //   type
    // );
    // newUser.id = users.length + 1;
    // users.push(newUser);
    // return newUser;   
      const newUser = new UserModel(
        name,email,password,type);
      return newUser;
    
  }

  static signIn(email, password) {
    const user = users.find(
      (u) =>
        u.email == email && u.password == password
    );
    return user;
  }

  static getAll() {
    return users;
  }
}

var users = [
  {
    id: 1,
    name: 'Seller User',
    email: 'seller@ecom.com',
    password: 'Password1',
    type: 'seller',
  },
  {
    id: 2,
    name: 'Customer User',
    email: 'customer@ecom.com',
    password: 'Password1',
    type: 'customer',
  },
];
