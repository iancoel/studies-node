const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url

  if (url === '/') {
    res.write('<html>')
    res.write('<head><title>Enter message</title></head>')
    res.write('<body><form action="/message" method="POST"><input type="text"><button type="submit">Send</button></input></form></body>')
    res.write('</html>')
    return res.end()
  }

  
});

server.listen(3000);
