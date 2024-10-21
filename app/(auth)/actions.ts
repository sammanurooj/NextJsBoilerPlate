"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { signIn } from "./auth";
import { hash } from "bcrypt-ts";

// Initialize Prisma Client
const prisma = new PrismaClient();

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1), // Add name validation here
});
export interface LoginActionState {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
}

// Prisma replacement for getUser function
async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

// Prisma replacement for createUser function
async function createUser(email: string, password: string, name: string) {
  return await prisma.user.create({
    data: {
      email,
      password, // Ensure password is hashed before storing
      name,     // Add name to user creation
    },
  });
}


export const login = async (
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};

export interface RegisterActionState {
  status:
  | "idle"
  | "in_progress"
  | "success"
  | "failed"
  | "user_exists"
  | "invalid_data";
}

export const register = async (
  _: RegisterActionState,
  formData: { email: string; password: string; name: string }, // Now includes name
): Promise<RegisterActionState> => {
  try {
    console.log("trial78")
    // Parse and validate form data including name
    const validatedData = authFormSchema.parse({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    });

    console.log("here", validatedData)

    // Check if user already exists
    let user = await getUser(validatedData.email);
    console.log("test", user)


    if (user) {
      return { status: "user_exists" } as RegisterActionState;
    } else {
      // Hash password and create user with email, hashed password, and name
      const hashedPassword = await hash(validatedData.password, 10);

      await createUser(validatedData.email, hashedPassword, validatedData.name);

      // Automatically sign in the user after registration
      await signIn("credentials", {
        email: validatedData.email,
        password: validatedData.password,
        redirect: false,
      });

      return { status: "success" };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};
