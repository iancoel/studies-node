const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error')
const db = require('./utils/database')

const app = express();

app.set('view engine', 'ejs'); //.set() allows to set any value globally on our application and we can read them with .get()

app.set('views', 'views'); //if we had to chenga the default directory from where our pages are provided, we would had to change this setting

app.use(bodyParser.urlencoded({ extended: false })); //this registers a middleware that will do all the body parsing

app.use(express.static(path.join(__dirname, 'public'))); //grants read access to the folder we pass to the function

app.use('/admin', adminRoutes);
app.use(shopRoutes);

db.execute('SELECT * FROM products')
.then(result => console.log(result[0]))
.catch(err => console.warn(err))

//404 page
app.use('/', errorController.get404)

app.listen(3000);
