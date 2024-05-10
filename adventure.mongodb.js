/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'adventure-journal';
const collection = 'adventures';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection);

// Seed data for the 'adventures' collection
const adventures = [
  {
    _id: "adventure1",
    name: "Hiking in the Grand Canyon",
    location: "Grand Canyon, Arizona",
    description: "A challenging hike through one of the most iconic landscapes in the world, offering breathtaking views and a sense of accomplishment."
  },
  {
    _id: "adventure2",
    name: "Surfing in Hawaii",
    location: "North Shore, Oahu, Hawaii",
    description: "Catch the perfect wave on the North Shore of Oahu, known for its world-class surfing conditions and vibrant surf culture."
  },
  {
    _id: "adventure3",
    name: "Exploring the Pyramids of Giza",
    location: "Giza, Egypt",
    description: "Visit the ancient wonders of the world, including the Great Pyramid of Giza, and immerse yourself in the rich history of Egypt."
  },
  {
    _id: "adventure4",
    name: "Whitewater Rafting in Colorado",
    location: "Colorado River, Colorado",
    description: "Paddle through Class III and IV rapids on the Colorado River, surrounded by stunning mountain scenery and wildlife."
  },
  {
    _id: "adventure5",
    name: "Diving in the Great Barrier Reef",
    location: "Great Barrier Reef, Australia",
    description: "Discover the vibrant underwater world of the Great Barrier Reef, home to thousands of species of marine life and coral formations."
  },
  {
    _id: "adventure6",
    name: "Cycling the Camino de Santiago",
    location: "Spain",
    description: "Embark on a spiritual journey along the Camino de Santiago, a network of pilgrimages leading to the shrine of the apostle Saint James the Great in the cathedral of Santiago de Compostela in Galicia in northwestern Spain."
  }
];

db.getCollection(collection).insertMany(adventures);
