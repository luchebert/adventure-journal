import connectToDatabase from '../../../src/utils/db';
import Adventure from '../../../src/models/Adventure';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const adventures = await Adventure.find({});
        res.status(200).json(adventures);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    case 'POST':
      try {
        const { name, location } = req.body;
        const newAdventure = new Adventure({ name, location });
        await newAdventure.save();
        res.status(201).json(newAdventure);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
