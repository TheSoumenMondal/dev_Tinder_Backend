import mongoose from "mongoose";
import serverConfig from "./serverConfig.js";
const connectDB = async () => {
    try {
        await mongoose.connect(serverConfig.MONGODB_URI);
    }
    catch (error) {
        process.exit(1);
    }
};
export default connectDB;
