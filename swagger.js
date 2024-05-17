const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'My API',
      description: 'Description'
    },
    host: 'cse341w04pa.onrender.com'
};
 
 
const outputFile = './swagger-output.json';
const routes = ['./routes/index.js', './routes/contacts.js'];
 
 
swaggerAutogen(outputFile, routes, doc);