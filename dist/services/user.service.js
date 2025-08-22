class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async signUpUser(signUpData) {
        const user = await this.userRepository.signUp(signUpData);
        return user;
    }
    async getUserById(userId) {
        const user = await this.userRepository.getUserById(userId);
        return user;
    }
}
export default UserService;
