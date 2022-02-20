const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); //this registers a middleware that will do all the body parsing

// .use allows us to pass a new middleware function, the function you pass to it will be executed for every incoming request.
// to allow it to travel on to the next middleware line, we have to call next()
app.use((req, res, next) => {
  next();
});

app.use(adminRoutes);
app.use(shopRoutes);

//404 page
app.use('/', (req, res, next) => {
  res.status(404).send('<h2>Page not found</h2>')
})

app.listen(3000);
