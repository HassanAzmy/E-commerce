//* third party module
const express = require('express');

const app = express();

//* middleware
app.use((req, res, next) => {
   console.log('In the middleware!');
   
   //* to pass the request to the next middleware
   next();
});

//* middleware
app.use((req, res, next) => {
   console.log('In the second middleware!');

   //* we can also override a header
   // res.setHeader('Content-Type', 'text/html');
   res.send('<h1>Hello from Express!</h1>');
});

//* old way of creating server
// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);

