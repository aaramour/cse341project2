const swaggerAutogen = require('swagger-autogen')();

// let hostURL = '';
// let scheme = '';

// if (process.env.LOCAL) {
//   let hostURL = 'localhost:'+process.env.PORT;
//   let scheme = ['http', 'https'];
// } else {
//   let hostURL = 'cse341project2ae.onrender.com';
//   let scheme = ['https'];
// };

const doc = {
    info: {
      title: 'My API',
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