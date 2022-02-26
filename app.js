const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}))// we use this to set a template engine that is not built-in like pug

app.set('view engine', 'hbs'); //.set() allows to set any value globally on our application and we can read them with .get()

app.set('views', 'views'); //if we had to chenga the default directory from where our pages are provided, we would had to change this setting

app.use(bodyParser.urlencoded({ extended: false })); //this registers a middleware that will do all the body parsing

app.use(express.static(path.join(__dirname, 'public'))); //grants read access to the folder we pass to the function

app.use('/admin', adminData.routes);
app.use(shopRoutes);

//404 page
app.use('/', (req, res, next) => {
  res.status(404).render('404', {pageTitle: '404 | Not Found'});
})

app.listen(3000);
