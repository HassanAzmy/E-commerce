const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controllers/error-controller');
const sequelize = require('./utility/database');
const Product = require('./models/product-model');
const User = require('./models/user-model');
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
Cart.belongsTo(User)

//* Many-to-many relationship
//* through to add the third table that references to both tables => CartItem(productId, cartId, quantity)
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

//* one-to-many relationship
Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {through: OrderItem});

//* Testing the database connection  
(
   async function testConnection() {
      try {
         await sequelize.authenticate();
         console.log('Connection has been established successfully.');
      } catch (error) {
         console.error('Unable to connect to the database:', error);
      }
   }
)()

let fetchedUser;

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
      fetchedUser = user;
      return user.getCart();
   })
   .then(cart => {
      if(!cart)
         return fetchedUser.createCart();
      return cart;
   })
   .then(cart => {
      app.listen(3000);
   })
   .catch(err => console.log(err));