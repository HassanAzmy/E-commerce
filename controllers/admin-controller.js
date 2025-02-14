import Product from '../models/product-model.js'
import express from 'express';


// /** @param {express.Request} req */
// export async function getProducts(req, res, next) {
//    try {
//       const products = await req.user.getProducts();
//       res.render('admin/products', {
//          prods: products,
//          pageTitle: 'Products'
//       });
//    } catch (err) {
//       console.log(err);
//    }
// };

/** @param {express.Request} req */
export function getAddProduct(req, res, next) {
   res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      url: '/admin/add-product',
      editing: false
   });
};

/** @param {express.Request} req */
export async function postAddProduct(req, res, next) {
   try {
      const body = req.body;
      const title = body.title;
      const imageUrl = body.imageUrl;
      const price = body.price;
      const description = body.description;
      const product = new Product(title, price, description, imageUrl);
      const queryRes =  await product.save();
      console.log('Created Product');
      res.redirect('/admin/Products');
   } catch (err) {
      console.log(err);
   }
};

// /** @param {express.Request} req */
// export async function getEditProduct (req, res, next) {
//    try {
//       const editMode = req.query.edit;
//       const productId = req.params.productId;
//       const products = await req.user.getProducts({ where: { Id: productId }})
//       res.render('admin/edit-product', {
//          product: products[0],
//          pageTitle: 'Edit Product',
//          editing: editMode
//       });
//    } catch(err) {
//       console.log(err);
//    }
// };

// /** @param {express.Request} req */
// export async function postEditProduct (req, res, next) {
//    try {
//       const requestBody = req.body;
//       const updatedTitle = requestBody.title;
//       const updatedImageUrl = requestBody.imageUrl;
//       const updatedPrice = requestBody.price;
//       const updatedDescription = requestBody.description;
//       const productId = requestBody.productId;
//       //* we can use findByPk and update each property (product.title = updatedTitle) then product.save()
//       const queryRes = await Product.update(
//          {
//             title: updatedTitle,
//             imageUrl: updatedImageUrl,
//             price: updatedPrice,
//             description: updatedDescription
//          }, 
//          {
//             where: {
//                Id: productId
//             }
//          }
//       );
//       res.redirect('/admin/Products');
//    } catch (err) {
//       console.log(err);
//    }
// };

// /** @param {express.Request} req */
// export async function postDeleteProduct (req, res, next) {
//    try {
//       const productId = req.body.productId;
//       //* we can use findByPk then product.destroy() on the recieved product
//       await Product.destroy(
//          {
//             where: {
//                Id: productId
//             }
//          }
//       );
//       res.redirect('/admin/Products');
//    } catch(err) {
//       console.log(err);
//    }
// };