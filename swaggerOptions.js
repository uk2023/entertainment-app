const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Entertainment App API',
      version: '1.0.0',
      description: 'API documentation for the Entertainment App',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
      },
    ],
  },
  apis: ['./pages/*.js', './pages/api/*.js'], // Paths to the files containing OpenAPI annotations
};

const specs = swaggerJsdoc(options);

module.exports = specs;
