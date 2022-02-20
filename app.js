const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); //this registers a middleware that will do all the body parsing

app.use('/admin', adminRoutes);
app.use(shopRoutes);

//404 page
app.use('/', (req, res, next) => {
  res.status(404).send('<h2>Page not found</h2>')
})

app.listen(3000);
