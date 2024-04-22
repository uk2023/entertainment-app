const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Path to your Swagger JSON file

const server = express();

// Serve Swagger UI at /api/docs
server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server ready on port ${PORT}`);
});
