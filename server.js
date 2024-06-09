const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./db/connection')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const axios = require('axios');
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
require('dotenv').config()

app.set('view engine', 'ejs');
var access_token = '';

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .get('/', function(req, res) {
    res.render('pages/index',{client_id: clientID});
  })
  .get('/oauth-callback', (req, res) => {
    const requestToken = req.query.code
    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      // Set the content type header, so that we get the response in JSON
      headers: {
           accept: 'application/json'
      }
    }).then((response) => {
      access_token = response.data.access_token
      res.redirect('/success');
    })
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'))
  .get('/', function(req, res) {
    res.render('pages/index',{client_id: clientID});
  })

  
  app.get('/success', function(req, res) {
  
    axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        Authorization: 'token ' + access_token
      }
    }).then((response) => {
      res.render('pages/success',{ userData: response.data });
    })
  });
  

mongodb.initDb((err, mongodb ) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT || port, () => {
      console.log('Connected to DB and listening at port ' + (process.env.PORT || port));
    });
  }
});