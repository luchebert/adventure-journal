import mongoose, { Mongoose } from 'mongoose';

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: null | Mongoose;
        promise: null | Promise<Mongoose>;
      };
    }
  }
}

let cached = (global as any).mongoose || { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI is not defined in.env file');
    }
    cached.promise = mongoose.connect(uri, options).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;