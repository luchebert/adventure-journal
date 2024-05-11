import mongoose, { Document, Schema } from 'mongoose';

export interface IAdventure extends Document {
  _id: string;
  name: string;
  location: string;
  description: string;
}

const adventureSchema: Schema = new Schema({
  _id: String,
  name: String,
  location: String,
  description: String,
});

export default mongoose.models.Adventure || mongoose.model<IAdventure>('Adventure', adventureSchema);
