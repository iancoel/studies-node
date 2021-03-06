const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  })
  .catch(err => console.warn(err))
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  // Product.findAll({where: {id: prodId}})
  // .then(product => {
  //   res.render('shop/product-detail', {
  //     product: product[0],
  //     pageTitle: product[0].title,
  //     path: '/products'
  //   })
  //   })
  // .catch(err => console.warn(err))

  Product.findByPk(prodId)
  .then(product => {
  res.render('shop/product-detail', {
    product: product,
    pageTitle: product.title,
    path: '/products'
  })
  })
  .catch(err => console.warn(err))
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  })
  .catch(err => console.warn(err))
};

exports.getCart = (req, res, next) => {
  req.user
   .getCart()
   .then(cart => {
     return cart.getProducts()
   })
   .then(products => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
      });
   })
   .catch(err => console.warn(err))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart
  let newQuantity = 1
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      let product
      if (products.length > 0) {
        product = products[0]
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity
        newQuantity = oldQuantity + 1
        return product
      }

      return Product.findByPk(prodId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(err => console.warn(err))
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      const product = products[0]
      return product.cartItem.destroy()
    })
    .then(result => {
      res.redirect('/cart')
    })
    .catch(err => console.warn(err))
}

exports.postOrder = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts()
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(products.map(product => {
            product.orderItem = {quantity: product.cartItem.quantity}
            return product
          }))
        })
        .catch(err => console.warn(err))
    })
    .then(result => {
      res.redirect('/orders')
    })
    .catch(err => console.warn(err))
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
