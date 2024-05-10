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
  .use('/', require('./routes/contacts'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html') //__dirname is the directory you're currently in
})


mongodb.initDb((err, mongodb ) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT || port, () => {
      console.log('Web Server is listening at port ' + (process.env.PORT || port));
    });
  }
});