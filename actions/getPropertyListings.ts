"use server";
import { db } from "@/lib/db";
import { getCurrentUser } from "./getCurrentUser";

const getPropertyListings = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser == null) {
      return [];
    }
    const properties = await db.listing.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return properties;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getPropertyListings;
