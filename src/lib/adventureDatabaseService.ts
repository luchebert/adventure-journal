// src/lib/adventureDatabaseService.ts
import connectToDatabase from '../utils/db';
import { IAdventurePlain } from '../models/Adventure';
import Adventure from '../models/Adventure';

const AdventureModel = Adventure;

export const fetchAdventures = async (): Promise<IAdventurePlain[]> => {
  try {
    await connectToDatabase();

    const adventures = await AdventureModel.find({}).exec();

    return adventures.map(doc => ({
      _id: doc._id as string,
      name: doc.name,
      location: doc.location,
      description: doc.description,
    })) as IAdventurePlain[];
  } catch (error) {
    console.error('Error fetching adventures:', error);
    throw error;
  }
};