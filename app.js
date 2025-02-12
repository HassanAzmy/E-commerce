const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controllers/errorController');
const sequelize = require('./utility/database');
const Product = require('./models/ProductModel');
const User = require('./models/userModel');
const Cart = require('./models/cart-model');
const CartItem = require('./models/cart-item-model');
const Order = require('./models/order-model');
const OrderItem = require('./models/order-item-model');
const { log } = require('console');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
   res.locals.url = req.originalUrl;
   User.findByPk(1)
      .then(user => {
         //* Sequelize object
         req.user = user;
         next();
      })
      .catch(err => console.log(err));
})

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(errorController.get404);

//* one-to-many relationship
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

//* one-to-one relationship
User.hasOne(Cart);
Cart.belongsTo(User) // optional we can omit it

//* Many-to-many relationship
//* through to add the third table that references to both tables => CartItem(productId, cartId, quantity)
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {through: OrderItem});

//* It syncs models to the database by creating tables
//* It also defines the relations in the database
//* force: true => to forcly override the database if exists
// sequelize.sync({force: true})
sequelize.sync()
   .then(result => {
      return User.findByPk(1);
   })
   .then(user => {
      if(!user) {
         return User.create({name: 'Azmy', email: 'Azmy@test.com'});
      }
      return user;
   })
   .then(user => {
      // console.log(user);
      return user.createCart();
   })
    .then(cart => {
        app.listen(3000);
    })
   .catch(err => console.log(err));