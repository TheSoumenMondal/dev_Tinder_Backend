import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import UserModel from '../models/user.model.js';
import serverConfig from '../config/serverConfig.js';

async function connectDB() {
  try {
    await mongoose.connect(serverConfig.MONGODB_URI!);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

function generateUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    bio: faker.lorem.paragraph(),
    age: faker.number.int({ min: 18, max: 65 }),
    email: faker.internet.email(),
    password: 'password123',
    avatarUrl: faker.image.avatar(),
    connectionCount: 0
  };
}

async function seedUsers(count: number) {
  try {
    await connectDB();
    
    console.log(`Starting to seed ${count} users...`);
    
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push(generateUser());
    }
    
    await UserModel.insertMany(users);
    
    console.log(`Successfully seeded ${count} users!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers(50);