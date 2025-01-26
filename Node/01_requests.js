//* node module
const http = require('http');

const server = http.createServer((req, res) => {
   console.log(req.url);
   console.log(req.method);
   console.log(req.httpVersion);
   console.log(req.headers);
});

//* we use any port number for local development
server.listen(3000);