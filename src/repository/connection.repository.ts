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
      // Prevent self-connections at the repository level
      if (senderId === receiverId) {
        throw new ValidationError("Cannot send connection request to yourself");
      }
      
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
        throw new ValidationError("Connection status must be ignored or interested");
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

      if (
        connection.status === "accepted" ||
        connection.status === "rejected"
      ) {
        throw new DuplicateEntryError(`Connection already ${connection.status}`);
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

  async getConnectionRequests(currentUserId: string) {
    const connections = await ConnectionModel.find({
      receiverId: currentUserId,
      senderId: { $ne: currentUserId }, // Ensure we don't return self-connections
      status: "interested",
    }).populate("senderId", "firstName lastName avatarUrl");
    if (!connections) {
      throw new NotFoundError({ resource: "Connection" });
    }
    return connections;
  }

  async getAllConnections(currentUserId: string) {
    const connections = await ConnectionModel.find({
      $and: [
        {
          $or: [
            {
              senderId: currentUserId,
            },
            {
              receiverId: currentUserId,
            }
          ]
        },
        {
          // Ensure we don't return connections where the user is both sender and receiver
          $nor: [
            {
              senderId: { $eq: currentUserId },
              receiverId: { $eq: currentUserId }
            }
          ]
        }
      ],
      status: "accepted",
    }).populate("senderId", "firstName lastName avatarUrl")
      .populate("receiverId", "firstName lastName avatarUrl")
      .exec();
    if (!connections) {
      throw new NotFoundError({ resource: "Connection" });
    }
    return connections;
  }

}

export default ConnectionRepository;
