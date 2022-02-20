const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); //this registers a middleware that will do all the body parsing

// .use allows us to pass a new middleware function, the function you pass to it will be executed for every incoming request.
// to allow it to travel on to the next middleware line, we have to call next()

app.use((req, res, next) => {
  next();
});

app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>')
});

app.use('/product', (req, res, next) => {
  console.log(req.body); //by default, req does not try to parse the receiving body, we have to add another middleware (at the top, because it should be done no matter what), install a 3rd party package body-parser

  res.redirect('/'); //express function for redirecting
});

app.use((req, res, next) => {
  res.send('<h1>Hello from express</h1>');
});

app.listen(3000);
