"use server";

import { db } from "@/lib/db";

interface Iparams {
  listingId?: string;
}

const getListingById = async ({ listingId }: Iparams) => {
  try {
    const listing = await db.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error) {
    console.log("Getting listing action error");
  }
};

export default getListingById;
