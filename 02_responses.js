const http = require('http');

const server = http.createServer((req, res) => {
   //* setting the headers
   res.setHeader('content-type', 'text/html');

   //* writing the content of the response
   res.write('<html>');
   res.write('<head><title>Home Page</title></head>');
   res.write('<body>Hello from my nodejs server</body>');
   res.write('</html>');

   //* ending the response
   res.end();
});

//* we use any port number for local development
server.listen(3000);