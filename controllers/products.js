const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true
  })
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title)
  product.save()

  res.redirect('/'); //express function for redirecting
}

exports.getProducts = (req, res, next) => {
  //we will pass the render method as a callback function so it can be executed after the async code inside models/product.js is done
  const products = Product.fetchAll((products) => {
    res.render('shop', {
      prods: products, 
      pageTitle: 'Shop', 
      path: '/', 
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    }) //render() will use the default template engine
  })
}