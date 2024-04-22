const express = require('express');
const next = require('next');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve Swagger UI at /api-docs
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Handle other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server ready on port ${PORT}`);
  });
});
