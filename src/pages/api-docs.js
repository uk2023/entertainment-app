// pages/api/docs.js

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json'; // Make sure you have a swagger.json file

export default function handler(req, res) {
  // Middleware for serving Swagger UI
  swaggerUi.setup(swaggerDocument)(req, res, () => {
    res.end();
  });
}
