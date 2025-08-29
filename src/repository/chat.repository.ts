import ChatModel from "../models/chat.model.js";

class ChatRepository {
  async fetchChats(participants: string[]) {
    const chats = await ChatModel.findOne({
      participants: { $all: participants, $size: participants.length },
    });

    return chats;
  }
}

export default ChatRepository;
