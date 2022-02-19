const requestHandler = (req, res) => {
  const {url, method} = req;

  if (url === '/') {
    res.write('<html>')
    res.write('<head><title>Homepage</title></head>')
    res.write('<body><h1>Hey, this is the homepage</h1></body>')
    res.write('<form action="/create-user" method="POST">')
    res.write('<input type="text" name="create-user">')
    res.write('<button type="submit">Create a new user</button>')
    res.write('</input>')
    res.write('</form>')
    res.write('</html>')
    return res.end();
  }

  if (url === '/users') {
    res.write('<html>')
    res.write('<head><title>Users</title></head>')
    res.write('<body><ul><li>Monica</li><li>Cebolinha</li><li>Cascao</li><li>Magali</li><li>Franjinha</li></ul></body>')
    res.write('</html>')
    return res.end();
  }

  if (url === '/create-user' && method === "POST") {
    const body = [];

    req.on('data', (chunk) => body.push(chunk));

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log(message);
      res.statusCode = 302;
      res.setHeader('Location', '/users');
      return res.end();
    })
  }
}

module.exports = requestHandler;