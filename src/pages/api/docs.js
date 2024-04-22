import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../swagger.json';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const options = {
      explorer: true, // Show the Swagger UI Explorer
    };
    swaggerUi.setup(swaggerDocument, options)(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
