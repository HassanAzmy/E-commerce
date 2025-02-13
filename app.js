import express from 'express';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import adminRouter from './routes/admin.js';
import shopRouter from './routes/shop.js';
import * as errorController from './controllers/error-controller.js';
import sequelize from './utility/database.js';
import Product from './models/product-model.js';
import User from './models/user-model.js';
import Cart from './models/cart-model.js';
import CartItem from './models/cart-item-model.js';
import Order from './models/order-model.js';
import OrderItem from './models/order-item-model.js';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

(
   async function seq() {
      try {
         //* It syncs models to the database by creating tables
         //* It also defines the relations in the database
         //* force: true => to forcly override the database if exists
         // const result = await sequelize.sync({ force: true })
         const result = await sequelize.sync();
         let user = await User.findByPk(1);
            
         if (!user) {
            user = await User.create({ name: 'Azmy', email: 'Azmy@test.com' });
         }

         let cart = await user.getCart();
         if (!cart)
            cart = await user.createCart();
   
         app.listen(3000);
      } catch (err) {
         console.log(err);
      }
   }
)()