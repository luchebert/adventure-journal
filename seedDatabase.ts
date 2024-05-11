import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';
import dotenv from 'dotenv';

dotenv.config();

// Define your Adventure class
class Adventure {
  @prop({ required: true, type: String })
  public name?: string;

  @prop({ required: true, type: String })
  public location?: string;

  @prop({ type: String })
  public description?: string;
}

// Get the model for the Adventure class
const AdventureModel = getModelForClass(Adventure);

// Function to connect to MongoDB
async function connectToDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://db:27017/foo';

  try {
    await mongoose.connect(uri, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

// Seed the database
async function seedDatabase() {
  // Ensure the database is connected before seeding
  await connectToDatabase();

  // Define your adventures data
  const adventuresData = [
    {
      name: "Hiking in the Grand Canyon",
      location: "Grand Canyon, Arizona",
      description: "A challenging hike through one of the most iconic landscapes in the world, offering breathtaking views and a sense of accomplishment."
    },
    {
      name: "Surfing in Hawaii",
      location: "North Shore, Oahu, Hawaii",
      description: "Catch the perfect wave on the North Shore of Oahu, known for its world-class surfing conditions and vibrant surf culture."
    },
    {
      name: "Exploring the Pyramids of Giza",
      location: "Giza, Egypt",
      description: "Visit the ancient wonders of the world, including the Great Pyramid of Giza, and immerse yourself in the rich history of Egypt."
    },
    {
      name: "Whitewater Rafting in Colorado",
      location: "Colorado River, Colorado",
      description: "Paddle through Class III and IV rapids on the Colorado River, surrounded by stunning mountain scenery and wildlife."
    },
    {
      name: "Diving in the Great Barrier Reef",
      location: "Great Barrier Reef, Australia",
      description: "Discover the vibrant underwater world of the Great Barrier Reef, home to thousands of species of marine life and coral formations."
    },
    {
      name: "Cycling the Camino de Santiago",
      location: "Spain",
      description: "Embark on a spiritual journey along the Camino de Santiago, a network of pilgrimages leading to the shrine of the apostle Saint James the Great in the cathedral of Santiago de Compostela in Galicia in northwestern Spain."
    }
  ];

  // Create new Adventure instances and save them to the database
  for (const adventureData of adventuresData) {
    const adventure = new AdventureModel(adventureData);
    await adventure.save();
  }

  console.log('Database has been seeded!');

  // Disconnect from the database
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

// Seed the database
(async () => {
  try {
    await seedDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
})();