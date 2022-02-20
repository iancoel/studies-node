const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>')
});

// .post() only fires with an incoming get request, we also have delete(), pat() and put()
router.post('/product', (req, res, next) => { 
  console.log(req.body); //by default, req does not try to parse the receiving body, we have to add another middleware (at the top, because it should be done no matter what) and use a 3rd party package body-parser

  res.redirect('/'); //express function for redirecting
});

module.exports = router;