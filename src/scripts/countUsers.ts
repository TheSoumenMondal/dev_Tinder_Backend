import mongoose from 'mongoose';
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

async function countUsers() {
  try {
    await connectDB();
    
    const count = await UserModel.countDocuments();
    
    console.log(`Total users in database: ${count}`);
    process.exit(0);
  } catch (error) {
    console.error('Error counting users:', error);
    process.exit(1);
  }
}


countUsers();