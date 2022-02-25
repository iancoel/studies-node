const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const adminData = require('./admin')

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('Aqui é em shop.js: ', adminData.products);

  const products = adminData.products

  res.render('shop', {prods: products, docTitle: 'Shop'}) //render() will use the default template engine
});

module.exports = router;