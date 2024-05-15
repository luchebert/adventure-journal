import { Mongoose } from 'mongoose';

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