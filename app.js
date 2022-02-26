const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const homeData = require('./routes/home')
const usersData = require('./routes/users')

const app = express()

app.set('view engine', 'ejs')

app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.use(homeData.routes)

app.use(usersData.routes)


app.listen(3000)