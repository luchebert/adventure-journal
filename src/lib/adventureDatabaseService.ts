// src/lib/adventureDatabaseService.ts
import connectToDatabase from '../utils/db';
import Adventure, { IAdventurePlain } from '../models/Adventure';
import { ObjectId } from 'mongodb'; // Ensure this import is present

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

export async function fetchAdventureById(_id: string): Promise<IAdventurePlain | null> {
  try {
    await connectToDatabase();

    // Convert the string _id to an ObjectId
    const objectId = new ObjectId(_id);

    // Use the converted ObjectId in the query
    const adventure = await AdventureModel.findOne({ _id: objectId }).exec();

    if (!adventure) {
      return null;
    }

    return {
      _id: adventure._id.toString(), // Convert back to string if necessary
      name: adventure.name,
      location: adventure.location,
      description: adventure.description,
    } as IAdventurePlain;
  } catch (error) {
    console.error('Error fetching adventure by id:', error);
    throw error;
  }
}
