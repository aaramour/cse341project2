const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./db/connection')



app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));


mongodb.initDb((err, mongodb ) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT || port, () => {
      console.log('Connected to DB and listening at port ' + (process.env.PORT || port));
    });
  }
});