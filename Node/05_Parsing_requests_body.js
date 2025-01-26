const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
   const url = req.url;
   const method = req.method;

   if(url === '/') {
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
   if(url == '/message' && method == 'POST') {
      const body = [];

      //* Event listener for incoming data 
      req.on('data', chunk => body.push(chunk));

      //* Event listener on-
      //  recieving all the data
      return req.on('end', () => {
         //* Returns a new Buffer which is the result of concatenating all the Buffer instances in the list together
         const parsedBody = Buffer.concat(body).toString();

         //* paresedBody will be such => message=the_value_entered_by_the_user
         const message = parsedBody.split('=')[1];                  
         fs.writeFileSync('message.txt', message);
         res.writeHead(302, { 'Location': '/' });         
         return res.end();
      })
   }

   res.setHeader('content-type', 'text/html');
   res.write(`
      <html>
         <head><title>Home Page</title></head>
         <body>Hello from my nodejs server</body>
      </html>
   `);
   res.end();
});

server.listen(3000);