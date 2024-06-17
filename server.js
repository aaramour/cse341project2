require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { auth, requiresAuth  } = require('express-openid-connect');
const app = express();
const mongodb = require('./db/connection')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.set('view engine', 'ejs');

app.use(
  auth({
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? `Logged in.<br><br> <a href="/profile">View profile</a><br><br><a href="/api-docs">Go to API Docs</a>` : 'Logged out');
});

app.get('/profile', (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })

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
  // .use('/', require('./routes'))


mongodb.initDb((err, mongodb ) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT || port, () => {
      console.log('Connected to DB and listening at port ' + (process.env.PORT || port));
    });
  }
});