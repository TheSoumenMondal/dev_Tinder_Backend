import UserRepository from "../repository/user.repository.js";
import { IUser } from "../types/index.js";

class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async signUpUser(signUpData : Partial<IUser>) {
    const user = await this.userRepository.signUp(signUpData);
    return user;
  }
}

export default UserService;
