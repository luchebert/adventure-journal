import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Adventure, { IAdventurePlain } from './src/models/Adventure';

dotenv.config();

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://db:27017/foo';

  try {
    await mongoose.connect(uri, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; // Re-throw the error after logging
  }
}

async function seedDatabase() {
  const adventuresData: IAdventurePlain[] = [
    {
      name: 'Hiking in the Grand Canyon',
      location: 'Grand Canyon, Arizona',
      description: 'A challenging hike through one of the most iconic landscapes in the world, offering breathtaking views and a sense of accomplishment.'
    },
    {
      name: 'Surfing in Hawaii',
      location: 'North Shore, Oahu, Hawaii',
      description: 'Catch the perfect wave on the North Shore of Oahu, known for its world-class surfing conditions and vibrant surf culture.'
    },
    {
      name: 'Exploring the Pyramids of Giza',
      location: 'Giza, Egypt',
      description: 'Visit the ancient wonders of the world, including the Great Pyramid of Giza, and immerse yourself in the rich history of Egypt.'
    },
    {
      name: 'Whitewater Rafting in Colorado',
      location: 'Colorado River, Colorado',
      description: 'Paddle through Class III and IV rapids on the Colorado River, surrounded by stunning mountain scenery and wildlife.'
    },
    {
      name: 'Diving in the Great Barrier Reef',
      location: 'Great Barrier Reef, Australia',
      description: 'Discover the vibrant underwater world of the Great Barrier Reef, home to thousands of species of marine life and coral formations.'
    },
    {
      name: 'Cycling the Camino de Santiago',
      location: 'Spain',
      description: 'Embark on a spiritual journey along the Camino de Santiago, a network of pilgrimages leading to the shrine of the apostle Saint James the Great in the cathedral of Santiago de Compostela in Galicia in northwestern Spain.'
    }
  ];

  try {
    const adventurePromises = adventuresData.map(adventureData => {
      const adventure = new Adventure(adventureData);
      return adventure.save(); // Returns a promise
    });

    // Wait for all promises to resolve
    await Promise.all(adventurePromises);

    console.log('Database has been seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

(async () => {
  try {
    await connectToDatabase();
    await seedDatabase();
    await mongoose.disconnect(); // Disconnect from MongoDB
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Unhandled promise rejection:', error);
  }
})().then(() => {
  console.log('Database seeding completed successfully.');
}).catch(error => console.error('Unhandled promise rejection:', error));