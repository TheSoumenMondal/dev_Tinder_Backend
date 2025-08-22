import UserService from "../services/user.service.js";
import UserRepository from "../repository/user.repository.js";
import { generateApiResponse } from "../utils/apiResponse.js";
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
export async function signUpUser(req, res) {
    const data = req.body;
    const user = await userService.signUpUser(data);
    return generateApiResponse(res, {
        data: user,
        error: null,
        message: "User signed up successfully",
        statusCode: 201,
    });
}
