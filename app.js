const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error')
const sequelize = require('./utils/database')
const Product = require('./models/product')
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs'); //.set() allows to set any value globally on our application and we can read them with .get()

app.set('views', 'views'); //if we had to chenga the default directory from where our pages are provided, we would had to change this setting

app.use(bodyParser.urlencoded({ extended: false })); //this registers a middleware that will do all the body parsing

app.use(express.static(path.join(__dirname, 'public'))); //grants read access to the folder we pass to the function

app.use((req, res, next) => {
  User.findByPk(1)
  .then(user => {
    req.user = user
    next()
  })
  .catch(err => console.warn(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);


//404 page 
app.use('/', errorController.get404)

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, {through: OrderItem})

sequelize
//.sync({force: true})
.sync()
.then(result => {
  return User.findByPk(1)
})
.then(user => {
  if (!user) {
   return User.create({ name: 'Ian', email: 'test@test.com'})
  }
  return user
})
.then(user => {
  return user.createCart()
})
.then(result => app.listen(3000))
.catch(err => console.warn(err))
