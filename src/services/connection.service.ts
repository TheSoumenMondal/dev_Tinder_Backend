import ConnectionRepository from "../repository/connection.repository.js";

class ConnectionService {
  private connectionRepo: ConnectionRepository;
  constructor(connectionRepo: ConnectionRepository) {
    this.connectionRepo = connectionRepo;
  }
  async sendConnectionRequest(senderId: string, receiverId: string) {
    return this.connectionRepo.sendConnectionRequest(senderId, receiverId);
  }
}

export default ConnectionService;
