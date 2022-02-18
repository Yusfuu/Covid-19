import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

interface Ivaccination {
  shot: Number;
  value: Boolean;
}

export interface IUser {
  cin: string;
  birthday: Date;
  address: string;
  phone: string;
  vaccination: Ivaccination[];
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IUser>(
  {
    cin: { type: String, required: true },
    birthday: { type: Date, required: true },
    address: { type: String },
    phone: { type: String },
    vaccination: [
      {
        shot: { type: Number, required: true },
        value: { type: Boolean, required: true },
      },
    ],
  },
  { timestamps: true }
);

// 3. Create a Model.
export const User = model<IUser>('User', schema);
