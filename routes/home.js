const express = require('express')

const router = express.Router()

const usersData = require('./users')

router.get('/', (req, res, next) => {
  const users = usersData.users

  res.render('home', {
    pageTitle: 'Home',
    users: users
  })
})

exports.routes = router