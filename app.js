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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
   res.locals.url = req.originalUrl;
   (async function getUser() {
      const user = await User.findById('67afa8c99dd783a2e4488e34');
      console.log('A user has been found');
      req.user = user;
   })()
   next();
})

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(errorController.get404);

mongoConnect(() => {
   app.listen(3000);
});