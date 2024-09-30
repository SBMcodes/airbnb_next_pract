"use server";

import { db } from "@/lib/db";

const getListings = async () => {
  try {
    const listings = db.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default getListings;
