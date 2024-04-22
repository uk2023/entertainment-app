export default function handler(req, res) {
    // In a real application, you might fetch data or perform other operations here
    const data = { message: 'Welcome to the API documentation!' };
    res.status(200).json(data);
  }
  