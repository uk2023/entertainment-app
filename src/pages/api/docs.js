import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './../../../swagger.json';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return swaggerUi.setup(swaggerDocument)(req, res);
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
