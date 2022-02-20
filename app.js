const express = require ('express');

const app = express();

// app.use((req, res, next) => {
//   console.log('this is the first middleware');
//   next();
// })

// app.use((req, res, next) => {
//   console.log('and this is the second');
// })

app.use('/users', (req, res, next) => {
  res.send('<p>this is the users page</p>')
})

app.use('/', (req, res, next) => {
  res.send('<p>this is the home page</p>')
})

app.listen(3000);