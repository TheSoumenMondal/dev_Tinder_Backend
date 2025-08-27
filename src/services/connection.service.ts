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
      throw new ValidationError("Can not send request to yourself.");
    }
    if (!receiverId || !senderId || !connectionStatus) {
      throw new ValidationError(
        !receiverId
          ? "Receiver ID is not valid"
          : !senderId
          ? "Sender ID is not valid"
          : "Connection status is not valid"
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

  async getAllConnections(currentUserId: string) {
    const connections = await this.connectionRepo.getAllConnections(currentUserId);
    return connections;
  }

  async getConnectionRequests(currentUserId: string) {
    const connections = await this.connectionRepo.getConnectionRequests(currentUserId);
    return connections;
  }

}

export default ConnectionService;
