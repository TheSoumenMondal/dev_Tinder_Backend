import { BaseError } from "../errors/baseError.js";
import DuplicateEntryError from "../errors/duplicateEntryError.js";
import { NotFoundError } from "../errors/notFoundError.js";
import ConnectionModel from "../models/connection.model.js";
import UserModel from "../models/user.model.js";

class ConnectionRepository {
  async sendConnectionRequest(senderId: string, receiverId: string) {
    try {
      const receiver = await UserModel.findById(receiverId);
      if (!receiver) {
        throw new NotFoundError({ resource: "User" });
      }

      const connection = await ConnectionModel.findOne({
        receiverId: receiverId,
        senderId: senderId,
      });

      if (connection) {
        throw new DuplicateEntryError("Connection");
      }

      const newConnection = await ConnectionModel.create({
        receiverId: receiverId,
        senderId: senderId,
        status: "interested",
      });

      return newConnection;
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new Error("Failed to send connection request");
    }
  }
}

export default ConnectionRepository;
