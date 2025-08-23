import { BaseError } from "../errors/baseError.js";
import DuplicateEntryError from "../errors/duplicateEntryError.js";
import { NotFoundError } from "../errors/notFoundError.js";
import ValidationError from "../errors/validationError.js";
import VerificationError from "../errors/verificationError.js";
import ConnectionModel from "../models/connection.model.js";
import UserModel from "../models/user.model.js";
import { connectionType } from "../types/index.js";

class ConnectionRepository {
  async sendConnectionRequest(
    senderId: string,
    receiverId: string,
    connectionStatus: "ignored" | "interested"
  ) {
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

      if (connectionStatus !== "ignored" && connectionStatus !== "interested") {
        throw new ValidationError("Connection status");
      }

      const newConnection = await ConnectionModel.create({
        receiverId: receiverId,
        senderId: senderId,
        status: connectionStatus,
      });

      return newConnection;
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new Error("Failed to send connection request");
    }
  }

  async updateConnectionStatus(
    currentUserId: string,
    status: Partial<connectionType>,
    connectionId: string
  ) {
    try {
      const connection = await ConnectionModel.findOne({
        _id: connectionId,
      });
      if (!connection) {
        throw new NotFoundError({ resource: "Connection" });
      }

      if (connection.receiverId.toString() !== currentUserId) {
        throw new VerificationError("Receiver");
      }

      const updatedConnection = await ConnectionModel.findOneAndUpdate(
        {
          _id: connectionId,
        },
        {
          status: status,
        },
        {
          new: true,
        }
      );

      return updatedConnection;
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new Error("Failed to send connection request");
    }
  }
}

export default ConnectionRepository;
