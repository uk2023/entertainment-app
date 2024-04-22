const express = require('express');
const next = require('next');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Path to your Swagger JSON file

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Body parser middleware
  server.use(express.json());

  // Serve Swagger UI at /api/docs
  server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Default route for Next.js pages
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server ready on port ${PORT}`);
  });
});
