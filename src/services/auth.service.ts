import VerificationError from "../errors/verificationError.js";
import UserRepository from "../repository/user.repository.js";
import { JwtStrategy } from "../utils/jwt.js";

class AuthService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async LogInUser(email: string, password: string) {
    const user = await this.userRepository.logIn(email, password);
    const verificationToken = JwtStrategy.signJwt({ userId: user._id });
    if (!verificationToken) {
      throw new VerificationError({ email, password });
    }
    return {
      user,
      verificationToken,
    };
  }
}

export default AuthService;
