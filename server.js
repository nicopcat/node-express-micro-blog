const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.method,req.url);

  let path = './views/';
  switch (req.url) {
    case '/':
      res.statusCode = 200;

      path += 'index.html'
      break;
    case '/index':
      res.statusCode = 200;
      path += 'index.html'
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/index')
      res.end();
      break;
    default:
      res.statusCode = 404;
      path += '404.html'
      break;
  }
  console.log(path);
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err); 
      res.end();
    }
    else {
      res.end(data);
     }
  })

});

server.listen(3000, 'localhost', () => {
  console.log('port: 3000');
})
