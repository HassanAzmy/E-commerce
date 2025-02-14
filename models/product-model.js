import {getDB} from '../utility/database.js'
import {Db} from 'mongodb';

export default class Product {
   constructor(title, price, desciption, imageUrl) {
      this.title = title;
      this.price = price;
      this.desciption = desciption;
      this.imageUrl = imageUrl;
   }

   /** @type {Db} */
   async save() {
      try {
         const db = getDB();

         //* Similar to tables in SQL
         const queryRes = await db.collection('products').insertOne(this);
         console.log(queryRes);
         return queryRes;
      } catch(err) {
         console.log(err);         
      }
   }

   static async fetchAll() {
      const db = getDB();

      //* we can add a filter
      // return db.collection('products').find({title: ' });

      const products = await db.collection('products').find().toArray();
      console.log(products);
      return products;
   }
}