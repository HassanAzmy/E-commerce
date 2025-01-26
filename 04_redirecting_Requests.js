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
                  <input type="text" name="message">
                  <button type="submit">Send</button>
               </form>
            </body>
         </html>
      `);
      return res.end();
   }
   if(url == '/message' && method == 'POST') {
      fs.writeFileSync('message.txt', 'DUMMY');
      
      //* writeHead(status_code, headers) => 302 is the status code for redirection and we are redirecting to the home page
      res.writeHead(302, { 'Location': '/' });

      //* we can also use the below method to redirect to the home page
      // res.statusCode = 302;
      // res.setHeader('Location', '/');
      
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