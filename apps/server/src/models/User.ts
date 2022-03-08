import { Schema, model, ObjectId } from 'mongoose';

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
  center: ObjectId;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IUser>(
  {
    cin: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    address: { type: String },
    phone: { type: String },
    vaccinations: [
      {
        shot: { type: Number, required: true, enum: [1, 2, 3] },
        datetime: { type: Date, required: true, default: Date.now },
      },
    ],
    center: { type: Schema.Types.ObjectId, ref: 'Center' },
  },
  { timestamps: true }
);

// 3. Create a Model.
export const User = model<IUser>('User', schema);