import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IAdmin {
  name: string;
  email: string;
  password: string | undefined;
  centers: string[];
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IAdmin>(
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
    centers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Center',
      },
    ],
  },
  { timestamps: true }
);

// 3. Create a Model.
export const Center = model<IAdmin>('Center', schema);
