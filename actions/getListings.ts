"use server";

import { db } from "@/lib/db";

export interface IListingParams {
  userId?: string;
}

const getListings = async ({ userId }: IListingParams) => {
  try {
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }

    const listings = db.listing.findMany({
      where: query,
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
