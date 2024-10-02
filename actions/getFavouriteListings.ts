"use server";
import { db } from "@/lib/db";
import { getCurrentUser } from "./getCurrentUser";

const getFavouriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser == null) {
      return [];
    }
    const favourites = await db.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favourites;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getFavouriteListings;
