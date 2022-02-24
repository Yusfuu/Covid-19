import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface ICenter {
  name: string;
  region: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<ICenter>(
  {
    name: { type: String, required: true },
    region: { type: String, required: true },
  },
  { timestamps: true }
);

// 3. Create a Model.
export const Center = model<ICenter>('Center', schema);
