const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'My API',
      description: 'Contacts API'
    },
    host: 'cse341w04pa.onrender.com',
    schemes: ['https']
};
 
 
const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];
 
 
swaggerAutogen(outputFile, routes, doc);