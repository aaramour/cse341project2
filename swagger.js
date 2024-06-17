const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config()

const doc = {
    info: {
      title: 'Recipes API',
      description: 'Recipes API'
    },
    host: 'cse341project2ae.onrender.com',
    schemes: ['https']
    // host: 'localhost:8080',
    // schemes: ['http', 'https']  
};
 
const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];
 
swaggerAutogen(outputFile, routes, doc);