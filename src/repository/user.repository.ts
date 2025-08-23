import DuplicateEntryError from "../errors/duplicateEntryError.js";
import { BaseError } from "../errors/baseError.js";
import UserModel from "../models/user.model.js";
import { IUser } from "../types/index.js";
import { NotFoundError } from "../errors/notFoundError.js";
import VerificationError from "../errors/verificationError.js";
import bcrypt from "bcryptjs";
import ValidationError from "../errors/validationError.js";

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

  async logIn(email: string, password: string) {
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        throw new NotFoundError({ resource: "User" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new VerificationError({ email, password });
      }

      return user;
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new Error("Error while logging in.");
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new NotFoundError({ resource: "User" });
      }
      return user;
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new Error("Error while fetching user.");
    }
  }

  async getAllProfiles(userId: string) {
    try {
      const users = await UserModel.find({
        _id: {
          $ne: userId,
        },
      });
      if (users.length === 0) {
        throw new Error("No users found.");
      }
      return users;
    } catch (error) {
      throw new Error("Error while getting all profiles.");
    }
  }

  async updateProfile(userId: string, userData: Partial<IUser>) {
    try {
      const user = await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          ...userData,
        },
        { new: true }
      );
      if (!user) {
        throw new ValidationError("User is not valid.");
      }
      return user;
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      throw new Error("Error while updating your profile.");
    }
  }
}

export default UserRepository;
