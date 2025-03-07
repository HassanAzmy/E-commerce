import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import * as errorController from './controllers/error-controller.js';
import adminRouter from './routes/admin.js';
import shopRouter from './routes/shop.js';
// import User from './models/user-model.js'

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
   res.locals.url = req.originalUrl;
   // (async function getUser() {
   //    const user = await User.findById('67afd0a59dd783a2e4488e3b');
   //    req.user = new User(user.username, user.email, user.cart, user._id);
      // next();
      // })()
   next();
})

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(errorController.get404);


(async function mongoConnect() {
   try {
      await mongoose.connect('mongodb+srv://hassanhussien13579:TlTqXukOzGlsVrMC@cluster0.tdik0.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0');
      app.listen(3000);
      console.log('Connected on port 3000');      
   } catch(err) {
      console.log(err);
   }
})()