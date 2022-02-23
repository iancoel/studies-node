const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const adminData = require('./admin')

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('Aqui é em shop.js: ', adminData.products);
  res.render('shop') //render() will use the default template engine
});

module.exports = router;