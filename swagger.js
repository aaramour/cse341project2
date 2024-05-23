const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'My API',
      description: 'Recipes API'
    },
    host: 'cse341project2ae.onrender.com',
    schemes: ['https']
};
 
 
const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];
 
 
swaggerAutogen(outputFile, routes, doc);