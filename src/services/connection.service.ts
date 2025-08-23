import ValidationError from "../errors/validationError.js";
import ConnectionRepository from "../repository/connection.repository.js";

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
    if(senderId === receiverId){
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
}

export default ConnectionService;
