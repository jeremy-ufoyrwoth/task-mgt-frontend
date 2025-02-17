import { z } from "zod";

export const LoginFormValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const RegisterFormValidation = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const CreateTaskFormValidation = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

export const AssignUserTaskFormValidation = z.object({
  userId: z.string().min(1, "User is required"),
});
