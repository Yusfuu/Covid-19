import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IDirector {
  name: string;
  email: string;
  password: string | undefined;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IDirector>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 3. Create a Model.
export const Director = model<IDirector>('Director', schema);
