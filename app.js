const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();


app.set('view engine', 'pug') //.set() allows to set any value globally on our application and we can read them with .get()

app.set('views', 'views') //if we had to chenga the default directory from where our pages are provided, we would had to change this setting

app.use(bodyParser.urlencoded({ extended: false })); //this registers a middleware that will do all the body parsing

app.use(express.static(path.join(__dirname, 'public'))); //grants read access to the folder we pass to the function

app.use('/admin', adminData.routes);
app.use(shopRoutes);

//404 page
app.use('/', (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);
