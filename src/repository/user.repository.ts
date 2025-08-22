import DuplicateEntryError from "../errors/duplicateEntryError.js";
import { BaseError } from "../errors/baseError.js";
import UserModel from "../models/user.model.js";
import { IUser } from "../types/index.js";

class UserRepository {
  async signUp(signUpData: Partial<IUser>) {
    try {
      const user = await UserModel.findOne({
        email: signUpData.email,
      });
      if (user) {
        throw new DuplicateEntryError(signUpData.email!);
      }
      const newUser = await UserModel.create({
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        email: signUpData.email,
        password: signUpData.password,
      });
      return newUser;
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new Error(`Error signing up user: ${error}`);
    }
  }
}

export default UserRepository;
