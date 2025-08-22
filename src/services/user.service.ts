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
  async getUserById(userId : string) {
    const user = await this.userRepository.getUserById(userId);
    return user;
  }

  async getAllProfiles(userId : string){
    const users = await this.userRepository.getAllProfiles(userId);
    return users;
  }

}

export default UserService;
