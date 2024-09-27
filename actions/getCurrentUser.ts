"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getCurrentUser = async () => {
  const session = await auth();
  try {
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error) {
    return null;
  }
};
