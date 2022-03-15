import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

//@ts-ignore
let cached = global.mongoose;

if (!cached) {
  //@ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

const connect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = await mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connect;
