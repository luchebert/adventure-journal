import mongoose, { Document, Schema } from 'mongoose';

// Interface for plain JavaScript object
export interface IAdventurePlain {
  _id?: string; // Explicitly marked as optional
  name: string;
  location: string;
  description: string;
}

// Interface for Mongoose document
export interface IAdventureDocument extends IAdventurePlain, Document {
  _id: string; // Ensure compatibility with Document by explicitly including _id
}

const AdventureSchema: Schema = new Schema<IAdventureDocument>({
  _id: String,
  name: String,
  location: String,
  description: String,
});

export default mongoose.models.Adventure || mongoose.model<IAdventureDocument>('Adventure', AdventureSchema);