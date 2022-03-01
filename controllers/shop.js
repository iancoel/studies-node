const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
  //we will pass the render method as a callback function so it can be executed after the async code inside models/product.js is done
  const products = Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products, 
      pageTitle: 'All Products', 
      path: '/products',
    }) //render() will use the default template engine
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products, 
      pageTitle: 'Shop', 
      path: '/',
    })
  })
} 

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}