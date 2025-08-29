import ChatRepository from "../repository/chat.repository.js";

class ChatService {
  ChatRepo;
  constructor(ChatRepository: ChatRepository) {
    this.ChatRepo = ChatRepository;
  }
  async fetchChats(participants : string[]) {
    const chats = await this.ChatRepo.fetchChats(participants);
    return chats;
  }
}

export default ChatService;
