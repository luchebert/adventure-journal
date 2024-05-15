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

// In adventureDatabaseService.ts or similar
export async function fetchAdventureById(_id: string): Promise<IAdventurePlain | null> {
  try {
    await connectToDatabase();

    const objectId = new ObjectId(_id);
    console.log(`Searching for adventure with ID: ${objectId}`);

    const adventureDocument = await AdventureModel.findById(objectId).exec();
    console.log(`Retrieved adventure document: ${JSON.stringify(adventureDocument)}`);

    if (!adventureDocument) {
      console.log('adventureDocument', null);
      return null;
    }

    const adventure = adventureDocument.toObject();
    console.log(`Converted adventure: ${JSON.stringify(adventure)}`);

    return {
      _id: adventure._id.toString(),
      name: adventure.name,
      location: adventure.location,
      description: adventure.description,
    } as IAdventurePlain;
  } catch (error) {
    console.error('Error fetching adventure by id:', error);
    throw error;
  }
}