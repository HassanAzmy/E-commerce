import mongodb from 'mongodb'
import {getDB} from '../utility/database.js'

export default class User {
   constructor(username, email, cart, Id) {
      this.username = username;
      this.email = email;
      this.cart = cart; // cart: items: [{products: [], quantity}]
      this._id = Id;
   }

   async save() {
      try {
         return await getDB().collection('users').insertOne(this);
      } catch(err) {
         throw err;
      }
   }

   async addToCart(product) {
      try {         
         const productIndex = this.cart.items.findIndex(item => {                    
            return item.productId.toString() === product._id.toString();
         });

         const updatedCartItems = [...this.cart.items];

         const isFound = productIndex !== -1;
         if (isFound) {            
            updatedCartItems[productIndex].quantity += 1 ;
         } else {
            updatedCartItems.push({
               productId: product._id,
               quantity: 1
            });
         }

         return await getDB().collection('users').updateOne(
            { _id: new mongodb.ObjectId(`${this._id}`) },
            { $set: { cart: { items: updatedCartItems } } }
         );         
      } catch (err) {
         console.log(err);         
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