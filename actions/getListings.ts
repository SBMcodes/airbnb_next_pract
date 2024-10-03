"use server";

import { db } from "@/lib/db";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

const getListings = async ({
  userId,
  bathroomCount,
  category,
  endDate,
  guestCount,
  locationValue,
  roomCount,
  startDate,
}: IListingParams) => {
  try {
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }
    if (category) {
      query.category = category;
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                startDate: {
                  lte: startDate,
                },
                endDate: {
                  gte: startDate,
                },
              },
              {
                startDate: {
                  lte: endDate,
                },
                endDate: {
                  gte: endDate,
                },
              },
            ],
          },
        },
      };
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
