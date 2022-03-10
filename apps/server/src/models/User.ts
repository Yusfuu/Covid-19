import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Ivaccination {
  shot: Number;
  datetime: Date;
}

export interface IUser {
  cin: string;
  birthday: Date;
  address: string;
  phone: string;
  vaccinations: Ivaccination[];
  effet:String;
  centre:String;

}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IUser>(
  {
    cin: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    address: { type: String },
    phone: { type: String },
    effet:{type: String},
    centre:{type: String},
    vaccinations: [
      {
        shot: { type: Number, required: true, enum: [1, 2, 3] },
        datetime: { type: Date, required: true, default: Date.now },
      },
    ],
    
  },
  { timestamps: true }
);

// 3. Create a Model.
export const User = model<IUser>('User', schema);
