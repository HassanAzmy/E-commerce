const http = require('http');

const server = http.createServer((req, res) => {
   const url = req.url;
   if(url === '/') {
      res.write(`
         <html>
            <head><title>Home Page</title></head>
            <body>
               <form action="/message" method="POST">
                  <input type="text" name="message">
                  <button type="submit">Send</button>
               </form>
            </body>
         </html>
      `);
      return res.end();
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