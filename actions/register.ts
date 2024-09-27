"use server";

import { RegisterSchema } from "@/schemas/RegisterSchema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, email, password } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const exisitingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exisitingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send Verification OTP to email

  return { success: "User created successfully!" };
};
