import mongoose from "mongoose";
import serverConfig from "./serverConfig.js";


const connectDB = async ()=>{
    try {
        await mongoose.connect(serverConfig.MONGODB_URI!)
        console.log("Database connection successfull.")
    } catch (error) {
        console.log("Failed to connect to DB.")
        process.exit(1);        
    }
}

export default connectDB;