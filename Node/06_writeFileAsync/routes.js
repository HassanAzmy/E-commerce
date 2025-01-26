const fs = require('fs');

const requestHandler = (req, res) => {
   const url = req.url;
   const method = req.method;

   if (url === '/') {
      res.write(`
            <html>
               <head><title>Home Page</title></head>
               <body>
                  <form action="/message" method="POST">
                     <!-- the value entered by the user has a key named message -->
                     <input type="text" name="message">

                     <button type="submit">Send</button>
                  </form>
               </body>
            </html>
         `);
      return res.end();
   }

   if (url == '/message' && method == 'POST') {
      const body = [];

      req.on('data', chunk => body.push(chunk));

      return req.on('end', () => {
         const parsedBody = Buffer.concat(body).toString();

         const message = parsedBody.split('=')[1];
         fs.writeFile('06_writeFileAsync/message.txt', message, err => {
            res.writeHead(302, { 'Location': '/' });
            return res.end();
         });
      })
   }

   res.setHeader('content-type', 'text/html');
   res.write(`
         <html>
            <head><title>Home Page</title></head>
            <body>404 Not Found</body>
         </html>
      `);
   res.end();
};

//NOTE: Module is a global object in nodejs
// module.exports = requestHandler;

//NOTE: For multiple exports
module.exports = {
   routesHandler: requestHandler,
};

//NOTE: OR
// module.exports.rotuesHandler = requestHandler;

//NOTE: OR
// exports.routesHandler = requestHandler;
