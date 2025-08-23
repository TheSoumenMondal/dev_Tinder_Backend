import ValidationError from "../errors/validationError.js";
import ConnectionRepository from "../repository/connection.repository.js";
import { connectionType } from "../types/index.js";

class ConnectionService {
  private connectionRepo: ConnectionRepository;
  constructor(connectionRepo: ConnectionRepository) {
    this.connectionRepo = connectionRepo;
  }
  async sendConnectionRequest(
    senderId: string,
    receiverId: string,
    connectionStatus: "ignored" | "interested"
  ) {
    if (senderId === receiverId) {
      throw new ValidationError("Sending request to yourself");
    }
    if (!receiverId || !senderId || !connectionStatus) {
      throw new ValidationError(
        !receiverId
          ? "Receiver ID"
          : !senderId
          ? "Sender ID"
          : "Connection status"
      );
    }
    return this.connectionRepo.sendConnectionRequest(
      senderId,
      receiverId,
      connectionStatus
    );
  }

  async updateConnectionStatus(
    currentUserId: string,
    status: Partial<connectionType>,
    connectionId: string
  ) {
    if (status !== "accepted" && status !== "rejected") {
      throw new ValidationError("Status");
    }
    const connection = await this.connectionRepo.updateConnectionStatus(
      currentUserId,
      status,
      connectionId
    );
    return connection
  }
}

export default ConnectionService;
