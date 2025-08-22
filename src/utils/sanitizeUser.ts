import { IUser } from "../types/index.js";

const sanitizeLoginUserResponse = (
  user: Partial<IUser> | any
): Partial<IUser> => {
  const plain =
    user && typeof user.toObject === "function"
      ? user.toObject()
      : user && user._doc
      ? user._doc
      : user;

  const { password, ...sanitizedUser } = plain || {};
  return sanitizedUser;
};

export default sanitizeLoginUserResponse;
