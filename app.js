import express from 'express';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import mongoConnect from './utility/database.js';
import * as errorController from './controllers/error-controller.js';
// import adminRouter from './routes/admin.js';
// import shopRouter from './routes/shop.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
   res.locals.url = req.originalUrl;
   next();
   // User.findByPk(1)
   //    .then(user => {
   //       //* Sequelize object
   //       req.user = user;
   //       next();
   //    })
   //    .catch(err => console.log(err));
})

// app.use('/admin', adminRouter);
// app.use(shopRouter);
app.use(errorController.get404);

mongoConnect(client => {
   app.listen(3000);
   console.log(client);
});