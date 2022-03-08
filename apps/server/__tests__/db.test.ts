import { connection } from 'mongoose';
import { db } from '../src/config/db';
import { User } from '../src/models/User';

beforeAll(async () => {
  // Connect to the database
  await db();
});

afterEach(async () => {
  // Clear the database after each test
  const collections = await connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // Close the database connection
  await connection.close();
});

describe('DB tests', () => {
  // Test the `db` function
  test('should connect to mongoodb', () => {
    // 1 : connected
    expect(connection.readyState).toBe(1);
  });
});

describe('User tests', () => {
  test('should create User', async () => {
    const user = {
      cin: 'ebb4984c-9b87-437a-8451-6775dbf253be',
      phone: '627-586-4083',
      address: '4982 Hammes Rue',
      birthday: 'Tue Jun 08 2021 21:14:02 GMT+0100 (GMT+01:00)',
      vaccinations: [],
    };

    const createdUser = await User.create(user);

    // check if the user is created
    expect(typeof createdUser._id.toString()).toBe('string');
    // check if the user is the same
    expect(createdUser.cin).toEqual(user.cin);
  });
});
