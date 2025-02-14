import {getDB} from '../utility/database.js'
import mongodb from 'mongodb';

export default class Product {
   constructor(title, price, description, imageUrl, userId) {
      this.title = title;
      this.price = price;
      this.description = description;
      this.imageUrl = imageUrl;
      this.userId = new mongodb.ObjectId(`${userId}`);
   }

   async save() {
      try {
         const db = getDB();

         //* Similar to tables in SQL
         const queryRes = await db.collection('products').insertOne(this);
         return queryRes;
      } catch(err) {
         console.log(err);         
      }
   }

   static async fetchAll() {
      const db = getDB();

      //* we can add a filter
      // return db.collection('products').find({title: ' });

      //* find() return a cursor which is a pointer to the result set of the query, so we convert it to an array
      const products = await db.collection('products').find().toArray();
      return products;
   }

   static async findById(prodId) {
      try {
         const db = getDB();

         //* mongodb creates the (_id) of type ObjectId which is not defined in JS. So we have to cast it
         //* if we use find() we have to use .next() to retrieve the next document from the cursor
         const product = await db.collection('products').findOne({_id: new mongodb.ObjectId(`${prodId}`)});
         return product;
      } catch(err) {
         throw err;
      }
   }

   async update(prodId) {
      try {
         const db = getDB();

         const queryRes = await db.collection('products').updateOne(
            {_id: new mongodb.ObjectId(`${prodId}`)}, 
            { $set: this }
         );
         return queryRes;
      } catch(err) {
         throw err;
      }
   }

   static async delete(prodId) {
      try {
         const db = getDB();

         const queryRes = await db.collection('products').deleteOne({ _id: new mongodb.ObjectId(`${prodId}`)});
         return queryRes;
      } catch (err) {
         throw err;
      }
   }
}