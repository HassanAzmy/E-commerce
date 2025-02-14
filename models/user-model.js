import mongodb from 'mongodb'
import {getDB} from '../utility/database.js'

export default class User {
   constructor(username, email) {
      this.username = username;
      this.email = email;
   }

   async save() {
      try {
         return await getDB().collection('users').insertOne(this);
      } catch(err) {
         throw err;
      }
   }

   static async findById(userId) {
      try {
         return await getDB().collection('users').findOne({ _id: new mongodb.ObjectId(`${userId}`)});
      } catch (err) {
         console.log(err);         
      }
   }
} 