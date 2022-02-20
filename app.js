const express = require('express');

const app = express();

// .use allows us to pass a new middleware function, the function you pass to it will be executed for every incoming request.
// to allow it to travel on to the next middleware line, we have to call next()
app.use((req, res, next) => {
  console.log('hey this is the first middleware');
  next();
});

app.use((req, res, next) => {
  console.log('hey this is the second middleware');

  res.send('<h1>Hello from express</h1>');
});

app.listen(3000);
