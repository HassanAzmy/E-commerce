const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
   console.log('/users middleware');
   res.send('<h1>Hello from my /users middleware</h1>');
});

app.use('/', (req, res, next) => {
   console.log('/ middleware');
   res.send('<h1>Hello from my / middleware</h1>');
})

app.listen(3000);