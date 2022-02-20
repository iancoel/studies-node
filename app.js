const path = require('path');

const express = require('express');

const homeRoutes = require('./routes/home');
const usersRoutes = require('./routes/users');

const app = express();

//static files -> access to public folder
app.use(express.static(path.join(__dirname, 'public')));

// routing
app.use(homeRoutes);
app.use(usersRoutes);

app.listen(3000)