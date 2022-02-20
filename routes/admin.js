const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

// admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  console.log(rootDir);  
});

// admin/add-product => POST
router.post('/add-product', (req, res, next) => { 
  console.log(req.body); //by default, req does not try to parse the receiving body, we have to add another middleware (at the top, because it should be done no matter what) and use a 3rd party package body-parser

  res.redirect('/'); //express function for redirecting
});

module.exports = router;