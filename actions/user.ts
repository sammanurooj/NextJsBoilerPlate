'use server'


import { config } from "dotenv";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { PrismaClient } from '@prisma/client';

config({
  path: ".env.local",
});

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function getUser(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    return await prisma.user.create({
      data: { email, password: hash },
    });
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}

