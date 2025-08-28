import dotenv from "dotenv"
dotenv.config();


const serverConfig = {
    PORT : process.env.PORT,
    MONGODB_URI : process.env.MONGODB_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    CORS_ORIGIN : process.env.CORS_ORIGIN,
    SOCKET_IO_ORIGIN : process.env.SOCKET_IO_ORIGIN
}

export default serverConfig