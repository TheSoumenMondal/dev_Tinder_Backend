import z from "zod";

const updateProfileSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long." })
      .max(50, { message: "First name cannot exceed 50 characters." })
      .optional(),
    lastName: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long." })
      .max(50, { message: "Last name cannot exceed 50 characters." })
      .optional(),
    bio: z
      .string()
      .min(5, { message: "Bio must be at least 5 characters long." })
      .max(50, { message: "Bio cannot exceed 50 characters." })
      .optional(),
    age: z
      .number()
      .min(14, { message: "You must be at least 14 years old." })
      .optional(),
    avatarUrl: z
      .string()
      .url({ message: "Avatar URL must be a valid URL." })
      .optional(),
  })
  .strict();

export { updateProfileSchema };
