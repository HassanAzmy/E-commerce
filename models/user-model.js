// import mongodb from 'mongodb'
// import {getDB} from '../utility/database.js'
// import Product from './product-model.js'

// export default class User {
//    constructor(username, email, cart, Id) {
//       this.username = username;
//       this.email = email;
//       this.cart = cart; // cart: items: [{products: [], quantity}]
//       this._id = Id;
//    }

//    async save() {
//       try {
//          return await getDB().collection('users').insertOne(this);
//       } catch(err) {
//          throw err;
//       }
//    }

//    static async findById(userId) {
//       try {
//          return await getDB().collection('users').findOne({ _id: new mongodb.ObjectId(`${userId}`) });
//       } catch (err) {
//          console.log(err);
//       }
//    }

//    async addToCart(product) {
//       try {         
//          const productIndex = this.cart.items.findIndex(item => {                                            
//             return item.productId.toString() === product._id.toString();
//          });

//          const updatedCartItems = [...this.cart.items];
//          const isProductFound = productIndex !== -1;
//          if (isProductFound) {            
//             updatedCartItems[productIndex].quantity += 1 ;
//          } else {
//             updatedCartItems.push({
//                productId: product._id,
//                quantity: 1
//             });
//          }

//          return await getDB().collection('users').updateOne(
//             { _id: new mongodb.ObjectId(`${this._id}`) },
//             { $set: { cart: { items: updatedCartItems } } }
//          );         
//       } catch (err) {
//          console.log(err);         
//       }
//    }

//    async getCart() {
//       try {
//          const productsIds = this.cart.items.map(item => {
//             return item.productId;
//          });

//          const products = await getDB().collection('products').find({_id: { $in: productsIds }}).toArray();         
//          return products.map(product => {
//             return {
//                ...product,
//                quantity: this.cart.items.find(item => {
//                   return item.productId.toString() === product._id.toString();
//                }).quantity
//             }
//          });
//       } catch(err) {
//          console.log(err);
//       }
//    }

//    async deleteFromCart(prodId) {
//       try {
//          const updatedItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== prodId;
//          });
                  
//          return await getDB().collection('users').updateOne(
//             {_id: this._id},
//             { $set: { cart: { items: updatedItems } } }
//          );         
//       } catch (err) {
//          console.log(err);
//       }   
//    }

//    async addOrder() {
//       const cartProducts = await this.getCart();
//       const productsWithoutUserId = cartProducts.map(({userId, ...rest}) => rest);
//       console.log(productsWithoutUserId);      
//       const order = {
//          products: productsWithoutUserId,
//          user: {
//             _id: this._id,
//             username: this.username
//          }
//       };
//       const queryRes = await getDB().collection('orders').insertOne(order);

//       this.cart.items = [];
//       return await getDB().collection('users').updateOne(
//          {_id: this._id},
//          {$set: {cart : {items: []}}}
//       );
//    }

//    async getOrder() {
//       return await getDB().collection('orders').find({'user._id': this._id}).toArray();
//    }
// } 