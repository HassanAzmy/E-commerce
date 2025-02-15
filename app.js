import express from 'express';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import {mongoConnect} from './utility/database.js';
import * as errorController from './controllers/error-controller.js';
import adminRouter from './routes/admin.js';
import shopRouter from './routes/shop.js';
import User from './models/user-model.js'
import { log } from 'console';

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
   (async function getUser() {
      const user = await User.findById('67afd0a59dd783a2e4488e3b');
      req.user = new User(user.username, user.email, user.cart, user._id);
      next();
   })()
})

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(errorController.get404);

mongoConnect(() => {
   console.log('A Connection has been established');
   app.listen(3000);
});