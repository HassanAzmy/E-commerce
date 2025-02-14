import {getDB} from '../utility/database.js'

export default class Product {
   constructor(title, price, desciption, imageUrl) {
      this.title = title;
      this.price = price;
      this.desciption = desciption;
      this.imageUrl = imageUrl;
   }

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
}