import connectToDatabase from '../../../src/utils/db';
import Adventure from '../../../src/models/Adventure';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {
    query: { id },
    method,
  } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        console.log('id', id);
        const adventure = await Adventure.findById(id);
        if (!adventure) {
          return res.status(404).json({ error: 'Adventure not found' });
        }
        res.status(200).json(adventure);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    case 'PUT':
      try {
        const { name, location } = req.body;
        const updatedAdventure = await Adventure.findByIdAndUpdate(
          id,
          { name, location },
          { new: true }
        );
        res.status(200).json(updatedAdventure);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    case 'DELETE':
      try {
        await Adventure.findByIdAndDelete(id);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
