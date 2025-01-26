const requestHandler = (req, res) => {
   const url = req.url;
   const method = req.method;

   if (url === '/') {
      res.write(`
            <html>
               <head>
                  <title>Assignment 1</title>
               </head>
               <body>
                  <h1>Welcome to the assignment 1</h1>
                  <form action="/create-user" method="POST">                  
                     <input type="text" name="username"><br><br>
                     <button type="submit">Submit</button>
                  </form>
               </body>
            </html>                  
         `);
      return res.end();
   }
   if (url === '/users') {
      res.write(`
            <html>
               <head>
                  <title>Assignment 1</title>
               </head>
               <body>
                  <h1>Users</h1>
                  <ul>
                     <li>User 1</li>
                     <li>User 2</li>
                     <li>User 3</li>
                     <li>User 4</li>
                  </ul>
               </body>
            </html>
         `);
      return res.end();
   }
   if (url === '/create-user' && method === 'POST') {
      const data = [];
      req.on('data', chunk => {
         console.log(chunk);
         data.push(chunk);
      });
      return req.on('end', () => {
         const parsedData = Buffer.concat(data).toString();
         const username = parsedData.split('=')[1];
         console.log(username);
         res.writeHead(302, { 'Location': '/users' });
      });
   }
};

module.exports = {
   routesHandler: requestHandler,
};

// exports.routesHandler = requestHandler;