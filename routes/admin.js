const express = require('express');

const router = express.Router();

// admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>')
});

// admin/add-product => POST
router.post('/add-product', (req, res, next) => { 
  console.log(req.body); //by default, req does not try to parse the receiving body, we have to add another middleware (at the top, because it should be done no matter what) and use a 3rd party package body-parser

  res.redirect('/'); //express function for redirecting
});

module.exports = router;