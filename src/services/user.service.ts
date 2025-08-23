import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { BaseError } from "../errors/baseError.js";
import ValidationError from "../errors/validationError.js";
import UserRepository from "../repository/user.repository.js";
import { IUser } from "../types/index.js";
import sanitizeLoginUserResponse from "../utils/sanitizeUser.js";
import { updateProfileSchema } from "../validator/index.js";

class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async signUpUser(signUpData: Partial<IUser>) {
    const user = await this.userRepository.signUp(signUpData);
    return user;
  }
  async getUserById(userId: string) {
    const user = await this.userRepository.getUserById(userId);
    return user;
  }

  async getAllProfiles(userId: string) {
    const users = await this.userRepository.getAllProfiles(userId);
    return users;
  }

  async updateUserProfile(userId: string, updatedData: Partial<IUser>) {
    console.log(updatedData);
    if (!updatedData) {
      throw new BaseError(
        "No data provided to update",
        StatusCodes.BAD_REQUEST
      );
    }

    try {
      const validatedData = await updateProfileSchema.parseAsync(updatedData);
      const updatedUser = await this.userRepository.updateProfile(
        userId,
        validatedData
      );
      const sanitizedUser = sanitizeLoginUserResponse(updatedUser);
      console.log(sanitizedUser);
      return sanitizedUser;
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }

      if (error instanceof ZodError) {
        const errorMessage = error.issues
          .map((issue) => `${issue.message}`)
          .join(", ");
        throw new ValidationError(`${errorMessage}`);
      }

      throw new BaseError(
        "Something went wrong on server side.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default UserService;
